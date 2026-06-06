import { useEffect, useState } from 'react'
import { getVacancies } from '../services/jobsService'
import { submitApplication } from '../services/applicationsService'
import VacancyCard from '../components/VacancyCard'
import Modal from '../components/Modal'
import './Jobs.css'

const mockVacancies = [
  {
    id: '1',
    titulo: 'Supervisor de Seguridad Industrial',
    ubicacion: 'Región de Antofagasta',
    requisitos: 'Experiencia en minería, liderazgo de equipos y cumplimiento de normas de seguridad.',
    descripcion: 'Gestiona programas de seguridad, análisis de riesgos y formación de personal.'
  },
  {
    id: '2',
    titulo: 'Ingeniero de Operaciones',
    ubicacion: 'Santiago',
    requisitos: 'Conocimiento avanzado en procesos industriales, optimización de producción y KPIs.',
    descripcion: 'Coordina operaciones de planta y mejora continua para entornos industriales.'
  },
  {
    id: '3',
    titulo: 'Operador de Maquinaria Pesada',
    ubicacion: 'Región del Biobío',
    requisitos: 'Manejo de cargadores y excavadoras con certificación vigente y experiencia en terreno.',
    descripcion: 'Opera maquinaria pesada con enfoque en seguridad y productividad.'
  },
  {
    id: '4',
    titulo: 'Coordinador Logístico',
    ubicacion: 'Región Metropolitana',
    requisitos: 'Gestión de flota, planificación de rutas y control de inventario en operaciones industriales.',
    descripcion: 'Asegura entregas seguras y cumplimiento de plazos en operaciones logísticas.'
  },
  {
    id: '5',
    titulo: 'Técnico en Mantenimiento Industrial',
    ubicacion: 'Región de Valparaíso',
    requisitos: 'Experiencia en mantenimiento preventivo, eléctrico y mecánico en plantas industriales.',
    descripcion: 'Realiza mantenimientos en equipos críticos y coordina reparaciones de alta complejidad.'
  }
]

function Jobs() {
  const [vacancies, setVacancies] = useState([])
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    async function loadVacancies() {
      try {
        const data = await getVacancies()
        setVacancies(data && data.length ? data : mockVacancies)
      } catch (error) {
        setVacancies(mockVacancies)
      }
    }

    loadVacancies()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('has-modal-open', isOpen)
    return () => document.body.classList.remove('has-modal-open')
  }, [isOpen])

  const handleApply = (vacancy) => {
    setSelected(vacancy)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelected(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const firstName = form.get('firstName') || ''
    const lastName = form.get('lastName') || ''
    const fullName = `${firstName} ${lastName}`.trim()

    form.set('name', fullName)
    form.set('puestoId', selected?.id)
    form.delete('firstName')
    form.delete('lastName')

    // Validate phone per country: require exactly 10 digits
    const countryCode = form.get('countryCode') || '+58'
    const rawPhone = form.get('phone') || ''
    const digits = ('' + rawPhone).replace(/\D/g, '')
    if (digits.length !== 10) {
      setStatus({ type: 'error', message: 'El teléfono debe contener exactamente 10 dígitos.' })
      return
    }

    try {
      const response = await submitApplication(form)
      let data = {}

      try {
        data = await response.json()
      } catch (jsonError) {
        data = {}
      }

      if (response.ok || response.status === 201) {
        setStatus({ type: 'success', message: data.message || 'Tu solicitud ha sido enviada con éxito. Recibirás un correo de confirmación.' })
        e.target.reset()
      } else {
        setStatus({ type: 'error', message: data.error || data.message || 'Error al enviar la postulación.' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error de conexión con el backend. Intenta nuevamente.' })
    }
  }

  return (
    <section className="jobs-page">
      <div className="section-header">
        <div>
          <p className="eyebrow">Oportunidades SENAFIM</p>
          <h1>Vacantes activas</h1>
          <p className="subtitle">Descubre cargos clave en minería, logística y operación industrial.</p>
        </div>
      </div>

      {status.message && (
        <div className={`status-banner ${status.type}`}>{status.message}</div>
      )}

      <div className="jobs-list">
        {vacancies.map((v) => (
          <VacancyCard key={v.id} vacancy={v} onApply={() => handleApply(v)} />
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={handleClose}>
        {selected && (
          <div className="apply-card">
            <h2>Postular a: {selected.titulo}</h2>

            {status.type === 'success' ? (
              <div className="apply-success">
                <p>{status.message}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button className="button button-primary" onClick={handleClose}>Cerrar</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>
                    Nombre
                    <input name="firstName" required />
                  </label>
                  <label>
                    Apellido
                    <input name="lastName" required />
                  </label>
                </div>

                <label>
                  Correo electrónico
                  <input name="email" type="email" required />
                </label>

                <div className="form-row">
                  <label>
                    Código de país
                    <select name="countryCode" defaultValue="+58">
                      <option value="+58">Venezuela (+58)</option>
                      <option value="+57">Colombia (+57)</option>
                    </select>
                  </label>
                  <label>
                    Teléfono (10 dígitos)
                    <input name="phone" type="tel" placeholder="Ej: 04141234567" required />
                  </label>
                </div>

                <label>
                  CV (PDF máximo 5 MB)
                  <input name="resume" type="file" accept="application/pdf" required />
                </label>

                {status.type === 'error' && <div className="status-banner error">{status.message}</div>}

                <div className="apply-actions">
                  <button type="button" onClick={handleClose} className="button button-secondary">Cancelar</button>
                  <button type="submit" className="button button-primary">Enviar postulación</button>
                </div>
              </form>
            )}
          </div>
        )}
      </Modal>
    </section>
  )
}

export default Jobs
