package org.athisworkshop.leavehub.dto;

public class DashboardLeaveDaysDTO {
    private Integer usedVacantionDays;
    private Integer usedMedicalDays;
    private Integer usedPaidDays;
    private Integer usedUnpaidDays;

    public Integer getUsedVacantionDays() {
        return usedVacantionDays;
    }

    public void setUsedVacantionDays(Integer usedVacantionDays) {
        this.usedVacantionDays = usedVacantionDays;
    }

    public Integer getUsedMedicalDays() {
        return usedMedicalDays;
    }

    public void setUsedMedicalDays(Integer usedMedicalDays) {
        this.usedMedicalDays = usedMedicalDays;
    }

    public Integer getUsedPaidDays() {
        return usedPaidDays;
    }

    public void setUsedPaidDays(Integer usedPaidDays) {
        this.usedPaidDays = usedPaidDays;
    }

    public Integer getUsedUnpaidDays() {
        return usedUnpaidDays;
    }

    public void setUsedUnpaidDays(Integer usedUnpaidDays) {
        this.usedUnpaidDays = usedUnpaidDays;
    }
}
