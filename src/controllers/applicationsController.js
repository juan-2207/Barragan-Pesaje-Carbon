import { prisma } from '../config/database.js';

export const createApplication = async (req, res) => {
    try {
        const { name, firstName, lastName, email, phone } = req.body;
        const puestoId = parseInt(req.body.puestoId, 10);

        if (!req.file) {
            return res.status(400).json({ ok: false, error: 'Debe seleccionar un archivo PDF válido.' });
        }

        const pdfUrl = `/uploads/${req.file.filename}`;
        const fullName = name?.trim() || `${firstName || ''} ${lastName || ''}`.trim();

        if (!fullName || !email || !phone || isNaN(puestoId)) {
            return res.status(400).json({ ok: false, error: 'Todos los campos son obligatorios.' });
        }

        const postulacion = await prisma.postulacion.create({
            data: {
                puestoId,
                nombre: fullName,
                telefono: phone,
                correo: email,
                pdfUrl,
            }
        });

        return res.status(201).json({ ok: true, message: 'Postulación enviada correctamente.', applicationId: postulacion.id });

    } catch (error) {
        console.error('Error al registrar:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor.' });
    }
};