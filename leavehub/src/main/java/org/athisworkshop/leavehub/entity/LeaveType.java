package org.athisworkshop.leavehub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "leave_type")
public class LeaveType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "leave_type_id")
    private Long id;

    @Column(name = "name", length = 120)
    private String name;

    @Column(name = "code", length = 7)
    private String code;

    @Column(name = "requires_attachment")
    private Boolean requiresAttachment;

    @Column(name = "paid")
    private Boolean paid;

    public LeaveType() {}

    public LeaveType(String name, String code, Boolean requiresAttachment, Boolean paid) {
        this.name = name;
        this.code = code;
        this.requiresAttachment = requiresAttachment;
        this.paid = paid;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Boolean getRequiresAttachment() {
        return requiresAttachment;
    }

    public void setRequiresAttachment(Boolean requiresAttachment) {
        this.requiresAttachment = requiresAttachment;
    }

    public Boolean getPaid() {
        return paid;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

}
