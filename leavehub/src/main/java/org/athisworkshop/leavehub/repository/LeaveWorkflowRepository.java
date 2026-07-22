package org.athisworkshop.leavehub.repository;

import org.athisworkshop.leavehub.entity.LeaveWorkflow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveWorkflowRepository extends JpaRepository<LeaveWorkflow, Long> {
}
