package org.athisworkshop.leavehub.service;

import org.athisworkshop.leavehub.controller.LeaveRequestController;
import org.athisworkshop.leavehub.dto.LeaveRequestDTO;
import org.athisworkshop.leavehub.entity.LeaveRequest;
import org.athisworkshop.leavehub.mapper.LeaveRequestMapper;
import org.athisworkshop.leavehub.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
