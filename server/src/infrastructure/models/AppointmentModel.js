const { poolPromise, sql } = require('../db/dbconfig');

class AppointmentModel {
  static async save(appointment) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('cliente_nombre', sql.NVarChar, appointment.cliente_nombre)
      .input('cliente_telefono', sql.NVarChar, appointment.cliente_telefono)
      .input('fecha', sql.Date, appointment.fecha)
      .input('hora', sql.Time, appointment.hora)
      .input('servicio', sql.NVarChar, appointment.servicio)
      .input('comentarios', sql.NVarChar, appointment.comentarios)
      .query(`
        INSERT INTO Appointments (cliente_nombre, cliente_telefono, fecha, hora, servicio, comentarios)
        VALUES (@cliente_nombre, @cliente_telefono, @fecha, @hora, @servicio, @comentarios)
      `);
    return result.recordsets;
  }

  static async findById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Appointments WHERE id_cita = @id');
    return result.recordset[0]; // Retorna la primera cita encontrada
  }

  static async findAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Appointments');
    return result.recordset; // Retorna todas las citas
  }

  static async update(id, appointment) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('cliente_nombre', sql.NVarChar, appointment.cliente_nombre)
      .input('cliente_telefono', sql.NVarChar, appointment.cliente_telefono)
      .input('fecha', sql.Date, appointment.fecha)
      .input('hora', sql.Time, appointment.hora)
      .input('servicio', sql.NVarChar, appointment.servicio)
      .input('comentarios', sql.NVarChar, appointment.comentarios)
      .query(`
        UPDATE Appointments
        SET cliente_nombre = @cliente_nombre, cliente_telefono = @cliente_telefono, fecha = @fecha, hora = @hora, servicio = @servicio, comentarios = @comentarios
        WHERE id_cita = @id
      `);
    return result.recordsets;
  }

  static async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Appointments WHERE id_cita = @id');
    return result.recordsets;
  }
}

module.exports = AppointmentModel;
