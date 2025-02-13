const AppointmentService = require("./services/AppointmentService");

(async () => {
    const appointmentService = new AppointmentService();
    console.log("Módulo de citas cargado correctamente");
})();
