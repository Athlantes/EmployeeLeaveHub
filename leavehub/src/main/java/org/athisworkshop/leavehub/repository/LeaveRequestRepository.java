package org.athisworkshop.leavehub.repository;

import org.athisworkshop.leavehub.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmployeeId(Long employeeId);
    Optional<LeaveRequest> findFirstByEmployeeIdAndStatusOrderByIdDesc(Long employeeId, String status);

    @Query("SELECT COALESCE(SUM(lr.workingDays), 0) FROM LeaveRequest lr " +
            "WHERE lr.employee.id = :employeeId " +
            "AND lr.status = 'ACCEPTED' " +
            "AND lr.leaveType.name = :type " +
            "AND YEAR(lr.startDate) = :year")
    Integer calculateUsedDaysByTypeAndYear(@Param("employeeId") Long employeeId,
                                           @Param("type") String type,
                                           @Param("year") int year);
}
