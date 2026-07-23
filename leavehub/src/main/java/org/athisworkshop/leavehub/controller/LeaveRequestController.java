package org.athisworkshop.leavehub.controller;

import org.athisworkshop.leavehub.dto.LeaveRequestDTO;
import org.athisworkshop.leavehub.entity.LeaveRequest;
import org.athisworkshop.leavehub.mapper.LeaveRequestMapper;
import org.athisworkshop.leavehub.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/leaverequest")
public class LeaveRequestController {
    @Autowired
    private LeaveRequestService leaveRequestService;

    @Autowired
    private LeaveRequestMapper leaveRequestMapper;

    @GetMapping("/{id}")
    public ResponseEntity<LeaveRequestDTO> getLeaveRequest(@PathVariable Long id) {
        LeaveRequestDTO leaveRequest = leaveRequestService.findLeaveRequestById(id);
        return ResponseEntity.ok(leaveRequest);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveRequestDTO>> getLeaveRequestsByEmployee(@PathVariable Long employeeId) {
        List<LeaveRequestDTO> requests = leaveRequestService.getAllRequestsByEmployeeId(employeeId);
        return ResponseEntity.ok(requests);
    }
}
