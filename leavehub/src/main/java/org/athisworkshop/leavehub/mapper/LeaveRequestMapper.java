package org.athisworkshop.leavehub.mapper;

import org.athisworkshop.leavehub.dto.LeaveRequestDTO;

import org.athisworkshop.leavehub.entity.LeaveRequest;
import org.springframework.stereotype.Component;

@Component
public class LeaveRequestMapper {
    public LeaveRequestDTO toDTO(LeaveRequest leaveRequest) {
        LeaveRequestDTO dto = new LeaveRequestDTO();
        dto.setId(leaveRequest.getId());
        dto.setLeaveRequestType(leaveRequest.getLeaveType().getName() + "(" + leaveRequest.getLeaveType().getCode() + ")");
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
        return leaverequest;
    }
}
