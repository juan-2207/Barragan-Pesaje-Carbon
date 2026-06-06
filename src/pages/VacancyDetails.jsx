import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getVacancyById } from '../services/jobsService'
import Card from '../components/Card'

function VacancyDetails() {
  const { id } = useParams()
  const [vacancy, setVacancy] = useState(null)

  useEffect(() => {
    async function loadVacancy() {
      const data = await getVacancyById(id)
      setVacancy(data)
    }

    loadVacancy()
  }, [id])

  if (!vacancy) {
    return <p>Cargando detalles de la vacante...</p>
  }

  return (
    <section>
      <h1>{vacancy.titulo}</h1>
      <Card title="Detalles de la vacante">
        <p><strong>Ubicación:</strong> {vacancy.ubicacion || 'No especificada'}</p>
        <p><strong>Requisitos:</strong> {vacancy.requisitos || 'No hay requisitos definidos.'}</p>
        <p>{vacancy.descripcion}</p>
      </Card>
    </section>
  )
}

export default VacancyDetails
