package org.athisworkshop.leavehub.repository;

import org.athisworkshop.leavehub.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmployeeId(Long employeeId);
    Optional<LeaveRequest> findFirstByEmployeeIdAndStatusOrderByIdDesc(Long employeeId, String status);

    @Query("SELECT COALESCE(SUM(lr.workingDays), 0) FROM LeaveRequest lr " +
            "WHERE lr.employee.id = :employeeId " +
            "AND lr.status = :status " +
            "AND lr.leaveType.name = :type " +
            "AND YEAR(lr.startDate) = :year")
    Long calculateUsedDaysByTypeAndYear(@Param("employeeId") Long employeeId,
                                        @Param("type") String type,
                                        @Param("year") int year,
                                        @Param("status") String status
    );

    @Query("SELECT r FROM LeaveRequest r WHERE r.employee.id = :employeeId " +
            "AND (:status IS NULL OR r.status = :status) " +
            "AND (:leaveType IS NULL OR r.leaveType.name = :leaveType) " +
            "AND (CAST(:targetDate AS date) IS NULL OR (:targetDate BETWEEN r.startDate AND r.endDate))")
    List<LeaveRequest> findFilteredRequests(
            @Param("employeeId") Long employeeId,
            @Param("status") String status,
            @Param("leaveType") String leaveType,
            @Param("targetDate") LocalDate targetDate
    );

    @Query("SELECT r FROM LeaveRequest r WHERE r.employee.id = :employeeId " +
            "AND r.startDate <= :endOfMonth AND r.endDate >= :startOfMonth " +
            "AND r.status IN ('PENDING', 'ACCEPTED')")
    List<LeaveRequest> findRequestsForCalendar(
            @Param("employeeId") Long employeeId,
            @Param("startOfMonth") LocalDate startOfMonth,
            @Param("endOfMonth") LocalDate endOfMonth
    );

    @Query("SELECT COUNT(lr) FROM LeaveRequest lr WHERE lr.employee.id = :employeeId " +
            "AND lr.status != 'REJECTED' " +
            "AND lr.startDate <= :endDate AND lr.endDate >= :startDate")
    long countOverlappingRequests(
            @Param("employeeId") Long employeeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
