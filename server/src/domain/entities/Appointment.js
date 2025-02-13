class Appointment {
    constructor(appointmentID, patientID, doctorID, appointmentDate, statusID, createdAt, updatedAt) {
        this.appointmentID = appointmentID;
        this.patientID = patientID;
        this.doctorID = doctorID;
        this.appointmentDate = appointmentDate;
        this.statusID = statusID;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Appointment;
