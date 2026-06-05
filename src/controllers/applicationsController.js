import { prisma } from '../config/database.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

        // Send email confirmation via Resend
        try {
            const fromEmail = process.env.RESEND_FROM_EMAIL || process.env.EMAIL_USER;
            if (!process.env.RESEND_API_KEY || !fromEmail) {
                throw new Error('Resend API key or sender email is not configured.');
            }

            const fromAddress = `SENAFIM Reclutamiento <${fromEmail}>`;
            const htmlContent = `
                    <div style="background:#f8fafc;padding:24px;font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#1f2937;">
                      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid rgba(15,23,42,0.08);box-shadow:0 20px 48px rgba(15,23,42,0.08);">
                        <div style="background:#0b132b;padding:20px 24px;">
                          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">SENAFIM</h1>
                        </div>
                        <div style="padding:24px;">
                          <p style="margin:0 0 18px;font-size:16px;color:#334155;">Hola <strong style="color:#0b132b;">${fullName}</strong>,</p>
                          <p style="margin:0 0 16px;font-size:15px;color:#475569;">Confirmamos que tu formulario se ha llenado de manera exitosa. Nos pondremos en contacto contigo para coordinar una entrevista de trabajo en caso de ser seleccionado.</p>
                          <p style="margin:0 0 24px;font-size:15px;color:#475569;">Has aplicado a la vacante con ID <strong>${puestoId}</strong>.</p>
                          <div style="display:inline-block;padding:12px 22px;background:#ff6b00;color:#ffffff;border-radius:999px;font-size:15px;font-weight:700;">Proceso en Curso</div>
                        </div>
                        <div style="background:#f1f5f9;padding:18px 24px;font-size:13px;color:#64748b;text-align:center;">Este es un correo automático, por favor no respondas a este mensaje.</div>
                      </div>
                    </div>
                `;

            await resend.emails.send({
                from: fromAddress,
                to: email,
                subject: 'Confirmación de postulación - SENAFIM',
                html: htmlContent,
                text: `Hola ${fullName},\n\nConfirmamos que tu formulario se ha llenado de manera exitosa. Nos pondremos en contacto contigo para coordinar una entrevista de trabajo en caso de ser seleccionado.\n\nProceso en Curso\n\nEste es un correo automático, por favor no respondas a este mensaje.`
            });
            console.log('Confirmation email sent to:', email);
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // No queremos que falle la aplicación si el correo no se envía
        }

        return res.status(201).json({ ok: true, message: 'Postulación enviada.', applicationId: postulacion.id });

    } catch (error) {
        console.error('Error al registrar:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor.' });
    }
};