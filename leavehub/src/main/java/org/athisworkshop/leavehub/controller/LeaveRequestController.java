package org.athisworkshop.leavehub.controller;

import org.athisworkshop.leavehub.dto.DashboardLeaveDaysDTO;
import org.athisworkshop.leavehub.dto.DashboardLeaveRequestDTO;
import org.athisworkshop.leavehub.dto.LeaveRequestDTO;
import org.athisworkshop.leavehub.entity.LeaveType;
import org.athisworkshop.leavehub.mapper.LeaveRequestMapper;
import org.athisworkshop.leavehub.repository.LeaveTypeRepository;
import org.athisworkshop.leavehub.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/leaverequest")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    @Autowired
    private LeaveRequestMapper leaveRequestMapper;

    @Autowired
    private LeaveTypeRepository leaveTypeRepository;

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

    @GetMapping("/dashboard/{employeeId}")
    public ResponseEntity<DashboardLeaveRequestDTO> getLatestLeaveRequestsForEmployee(@PathVariable Long employeeId) {
        DashboardLeaveRequestDTO result = leaveRequestService.getDashboardRequests(employeeId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/stats/{employeeId}")
    public ResponseEntity<DashboardLeaveDaysDTO> getLeaveDaysForEmployee(@PathVariable Long employeeId) {
        DashboardLeaveDaysDTO result = leaveRequestService.getDashboardUsedDays(employeeId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/my")
    public ResponseEntity<List<LeaveRequestDTO>> getMyFilteredRequests(
            @RequestParam Long emplId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<LeaveRequestDTO> filteredRequests = leaveRequestService.getFilteredMyRequests(emplId, status, type, date);
        return ResponseEntity.ok(filteredRequests);
    }

    @GetMapping("/types")
    public ResponseEntity<List<String>> getAllLeaveTypes() {
        List<String> types = leaveTypeRepository.findAll().stream()
                .map(LeaveType::getName)
                .collect(Collectors.toList());
        return ResponseEntity.ok(types);
    }

    @GetMapping("/calendar")
    public ResponseEntity<List<LeaveRequestDTO>> getCalendarRequests(
            @RequestParam Long employeeId,
            @RequestParam int year,
            @RequestParam int month) {
        List<LeaveRequestDTO> requests = leaveRequestService.getCalendarRequests(employeeId, year, month);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/holidays")
    public ResponseEntity<List<LocalDate>> getHolidays(@RequestParam int year) {
        return ResponseEntity.ok(leaveRequestService.getHolidaysForYear(year));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<LeaveRequestDTO> createLeaveRequest(
            @RequestPart("request") LeaveRequestDTO leaveRequestDTO,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        LeaveRequestDTO createdRequest = leaveRequestService.createLeaveRequest(leaveRequestDTO, file);
        return ResponseEntity.ok(createdRequest);
    }
}