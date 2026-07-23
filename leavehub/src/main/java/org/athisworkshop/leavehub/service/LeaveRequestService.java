package org.athisworkshop.leavehub.service;

import org.athisworkshop.leavehub.dto.DashboardLeaveDaysDTO;
import org.athisworkshop.leavehub.dto.DashboardLeaveRequestDTO;
import org.athisworkshop.leavehub.dto.LeaveRequestDTO;
import org.athisworkshop.leavehub.entity.LeaveRequest;
import org.athisworkshop.leavehub.mapper.LeaveRequestMapper;
import org.athisworkshop.leavehub.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;
import java.util.Optional;

@Service
public class LeaveRequestService {
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private LeaveRequestMapper leaveRequestMapper;

    public LeaveRequestDTO findLeaveRequestById(Long id) {
        LeaveRequest leaveRequest = leaveRequestRepository.getReferenceById(id);
        return leaveRequestMapper.toDTO(leaveRequest);
    }

    public List<LeaveRequestDTO> getAllRequestsByEmployeeId(Long employeeId) {
        List<LeaveRequest> leaveRequests = leaveRequestRepository.findByEmployeeId(employeeId);

        return leaveRequests.stream()
                .map(leaveRequestMapper::toDTO)
                .toList();
    }

    public DashboardLeaveRequestDTO getDashboardRequests(Long employeeId) {
        DashboardLeaveRequestDTO dashboardLeaveRequestDTO = new DashboardLeaveRequestDTO();

        Optional<LeaveRequest> draft = leaveRequestRepository.findFirstByEmployeeIdAndStatusOrderByIdDesc(employeeId, "DRAFT");
        draft.ifPresent(leaveRequest -> dashboardLeaveRequestDTO.setLatestDraft(leaveRequestMapper.toDTO(leaveRequest)));

        Optional<LeaveRequest> pending = leaveRequestRepository.findFirstByEmployeeIdAndStatusOrderByIdDesc(employeeId, "PENDING");
        pending.ifPresent(leaveRequest -> dashboardLeaveRequestDTO.setLatestPending(leaveRequestMapper.toDTO(leaveRequest)));

        Optional<LeaveRequest> accepted = leaveRequestRepository.findFirstByEmployeeIdAndStatusOrderByIdDesc(employeeId, "ACCEPTED");
        accepted.ifPresent(leaveRequest -> dashboardLeaveRequestDTO.setLatestAccepted(leaveRequestMapper.toDTO(leaveRequest)));

        Optional<LeaveRequest> rejected = leaveRequestRepository.findFirstByEmployeeIdAndStatusOrderByIdDesc(employeeId, "REJECTED");
        rejected.ifPresent(leaveRequest -> dashboardLeaveRequestDTO.setLatestRejected(leaveRequestMapper.toDTO(leaveRequest)));

        return dashboardLeaveRequestDTO;
    }

    public DashboardLeaveDaysDTO getDashboardUsedDays(Long employeeId) {
        int currentYear = Year.now().getValue();
        DashboardLeaveDaysDTO stats = new DashboardLeaveDaysDTO();

        stats.setUsedVacantionDays(leaveRequestRepository.calculateUsedDaysByTypeAndYear(employeeId, "Concediu De Odihna(CO)", currentYear));
        stats.setUsedMedicalDays(leaveRequestRepository.calculateUsedDaysByTypeAndYear(employeeId, "Concediu Medical(CM)", currentYear));
        stats.setUsedUnpaidDays(leaveRequestRepository.calculateUsedDaysByTypeAndYear(employeeId, "Concediu Fara Plata (FP)", currentYear));
        stats.setUsedPaidDays(leaveRequestRepository.calculateUsedDaysByTypeAndYear(employeeId, "Zile Libere Platite (SPECIAL)", currentYear));

        return stats;

    }
}
