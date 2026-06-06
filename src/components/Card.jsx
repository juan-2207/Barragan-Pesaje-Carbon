import './Card.css'

function Card({ title, children }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </article>
  )
}

export default Card
