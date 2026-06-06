import './VacancyCard.css'

export default function VacancyCard({ vacancy, onApply }) {
  return (
    <article className="vacancy-card">
      <div className="vacancy-main">
        <h3>{vacancy.titulo}</h3>
        <p className="vacancy-meta">{vacancy.ubicacion || 'Ubicación no especificada'}</p>
        <p className="vacancy-desc">{vacancy.requisitos || vacancy.descripcion || 'Requisitos no disponibles.'}</p>
      </div>

      <div className="vacancy-actions">
        <button className="button button-primary" onClick={onApply}>Postular</button>
      </div>
    </article>
  )
}
