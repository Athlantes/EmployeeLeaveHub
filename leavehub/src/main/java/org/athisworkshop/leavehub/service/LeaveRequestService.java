package org.athisworkshop.leavehub.service;

import org.athisworkshop.leavehub.dto.DashboardLeaveDaysDTO;
import org.athisworkshop.leavehub.dto.DashboardLeaveRequestDTO;
import org.athisworkshop.leavehub.dto.LeaveRequestDTO;
import org.athisworkshop.leavehub.entity.Attachment;
import org.athisworkshop.leavehub.entity.LeaveRequest;
import org.athisworkshop.leavehub.mapper.LeaveRequestMapper;
import org.athisworkshop.leavehub.repository.EmployeeRepository;
import org.athisworkshop.leavehub.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LeaveRequestService {
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private LeaveRequestMapper leaveRequestMapper;

    @Autowired
    private EmployeeRepository employeeRepository;

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

        String acceptedStatus = "ACCEPTED";

        Long vacationDays = leaveRequestRepository.calculateUsedDaysByTypeAndYear(employeeId, "Concediu De Odihna", currentYear, acceptedStatus);
        stats.setUsedVacationDays(vacationDays.intValue());

        Long medicalDays = leaveRequestRepository.calculateUsedDaysByTypeAndYear(employeeId, "Concediu Medical", currentYear, acceptedStatus);
        stats.setUsedMedicalDays(medicalDays.intValue());

        Long unpaidDays = leaveRequestRepository.calculateUsedDaysByTypeAndYear(employeeId, "Concediu Fara Plata", currentYear, acceptedStatus);
        stats.setUsedUnpaidDays(unpaidDays.intValue());

        Long paidDays = leaveRequestRepository.calculateUsedDaysByTypeAndYear(employeeId, "Evenimente Deosebite", currentYear, acceptedStatus);
        stats.setUsedPaidDays(paidDays.intValue());

        Long paternityDays = leaveRequestRepository.calculateUsedDaysByTypeAndYear(employeeId, "Concediu de Paternitate", currentYear, acceptedStatus);
        stats.setUsedPaternityDays(paternityDays.intValue());

        Long maternityDays = leaveRequestRepository.calculateUsedDaysByTypeAndYear(employeeId, "Concediu de Maternitate", currentYear, acceptedStatus);
        stats.setUsedMaternityDays(maternityDays.intValue());

        Long studyDays = leaveRequestRepository.calculateUsedDaysByTypeAndYear(employeeId, "Concediu de Studii", currentYear, acceptedStatus);
        stats.setUsedStudyDays(studyDays.intValue());

        Long sabbaticalDays = leaveRequestRepository.calculateUsedDaysByTypeAndYear(employeeId, "Concediu Sabatic", currentYear, acceptedStatus);
        stats.setUsedSabbaticalDays(sabbaticalDays.intValue());

        return stats;
    }

    public List<LeaveRequestDTO> getFilteredMyRequests(Long employeeId, String status, String type, LocalDate date) {
        List<LeaveRequest> requests = leaveRequestRepository.findFilteredRequests(employeeId, status, type, date);
        return requests.stream()
                .map(leaveRequestMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<LeaveRequestDTO> getCalendarRequests(Long employeeId, int year, int month) {
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.withDayOfMonth(startOfMonth.lengthOfMonth());

        List<LeaveRequest> requests = leaveRequestRepository.findRequestsForCalendar(employeeId, startOfMonth, endOfMonth);

        return requests.stream()
                .map(leaveRequestMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<LocalDate> getHolidaysForYear(int year) {
        return List.of(
                LocalDate.of(year, 1, 1), LocalDate.of(year, 1, 2), // Anul Nou
                LocalDate.of(year, 1, 24), // Unirea Principatelor
                LocalDate.of(year, 5, 1), // Ziua Muncii
                LocalDate.of(year, 6, 1), // Ziua Copilului
                LocalDate.of(year, 8, 15), // Adormirea Maicii Domnului
                LocalDate.of(year, 11, 30), // Sf Andrei
                LocalDate.of(year, 12, 1), // Ziua Nationala
                LocalDate.of(year, 12, 25), LocalDate.of(year, 12, 26) // Craciun
        );
    }

    public LeaveRequestDTO createLeaveRequest(LeaveRequestDTO dto, MultipartFile file) {

        long overlappingCount = leaveRequestRepository.countOverlappingRequests(
            dto.getEmployeeId(),
            dto.getStartDate(),
            dto.getEndDate()
        );

        if (overlappingCount > 0) {
            throw new IllegalArgumentException("You already have a request for those dates.");
        }

        LeaveRequest leaveRequest = leaveRequestMapper.toEntity(dto);
        leaveRequest.setEmployee(employeeRepository.findById(dto.getEmployeeId()).orElseThrow());
        leaveRequest.setCreatedAt(LocalDateTime.now());

        if (file != null && !file.isEmpty()) {
            Attachment attachment = new Attachment();
            attachment.setFileName(file.getOriginalFilename());
            attachment.setFileType(file.getContentType());
            try {
                attachment.setData(file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error processing the file", e);
            }
            leaveRequest.setAttachment(attachment);
        }

        LeaveRequest savedRequest = leaveRequestRepository.save(leaveRequest);
        return leaveRequestMapper.toDTO(savedRequest);
    }
}