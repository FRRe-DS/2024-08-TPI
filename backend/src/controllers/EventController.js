const EventModel = require('../models/EventModel');

class EventController {
    // Crear un nuevo evento
    static async createEvent(req, res) {
        const { nombre, fecha, lugar, descripcion, tematica } = req.body;
        try {
            const event = await EventModel.createEvent({ nombre, fecha, lugar, descripcion, tematica });
            res.status(201).json(event);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el evento' });
        }
    }

    // Obtener todos los eventos
    static async getAllEvents(_req, res) {
        try {
            const events = await EventModel.getAllEvents();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los eventos' });
        }
    }

    // Obtener evento por ID
    static async getEventById(req, res) {
        const { id } = req.params;
        try {
            const event = await EventModel.getEventById(id);
            if (!event) {
                return res.status(404).json({ error: 'Evento no encontrado' });
            }
            res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el evento' });
        }
    }

    // Actualizar evento
    static async updateEvent(req, res) {
        const { id } = req.params;
        const { nombre, fecha, lugar, descripcion, tematica } = req.body;
        try {
            const success = await EventModel.updateEvent(id, { nombre, fecha, lugar, descripcion, tematica });
            if (!success) {
                return res.status(404).json({ error: 'Evento no encontrado' });
            }
            res.status(200).json({ message: 'Evento actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el evento' });
        }
    }

    // Eliminar evento
    static async deleteEvent(req, res) {
        const { id } = req.params;
        try {
            const success = await EventModel.deleteEvent(id);
            if (!success) {
                return res.status(404).json({ error: 'Evento no encontrado' });
            }
            res.status(200).json({ message: 'Evento eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el evento' });
        }
    }
}

module.exports = EventController;
