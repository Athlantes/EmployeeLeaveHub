package org.athisworkshop.leavehub.mapper;

import org.athisworkshop.leavehub.dto.LeaveRequestDTO;
import org.athisworkshop.leavehub.entity.LeaveRequest;
import org.athisworkshop.leavehub.entity.LeaveType;
import org.athisworkshop.leavehub.repository.LeaveTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LeaveRequestMapper {

    @Autowired
    private LeaveTypeRepository leaveTypeRepository;

    public LeaveRequestDTO toDTO(LeaveRequest leaveRequest) {
        LeaveRequestDTO dto = new LeaveRequestDTO();
        dto.setId(leaveRequest.getId());
        dto.setLeaveRequestType(leaveRequest.getLeaveType().getName());
        dto.setStartDate(leaveRequest.getStartDate());
        dto.setEndDate(leaveRequest.getEndDate());
        dto.setWorkingDays(leaveRequest.getWorkingDays());
        dto.setStatus(LeaveRequestDTO.Status.valueOf(leaveRequest.getStatus()));
        return dto;
    }

    public LeaveRequest toEntity(LeaveRequestDTO dto) {
        LeaveRequest leaverequest = new LeaveRequest();
        leaverequest.setId(dto.getId());
        leaverequest.setStartDate(dto.getStartDate());
        leaverequest.setEndDate(dto.getEndDate());
        leaverequest.setWorkingDays(dto.getWorkingDays());
        leaverequest.setStatus(dto.getStatus().name());

        LeaveType leaveType = leaveTypeRepository.findAll().stream()
                .filter(lt -> lt.getName().equals(dto.getLeaveRequestType()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Leave request type wasn't found"));
        leaverequest.setLeaveType(leaveType);

        return leaverequest;
    }
}