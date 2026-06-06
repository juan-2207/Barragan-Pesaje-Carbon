import Card from '../components/Card'
import './Contact.css'

function Contact() {
  return (
    <section className="contact-page">
      <h1>Contacto</h1>

      <div className="contact-wrapper">
        <Card>
          <div className="contact-card">
            <div className="contact-row">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 8V7a2 2 0 0 0-2-2h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 21v-2a4 4 0 0 1 4-4h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 8v10a2 2 0 0 1-2 2H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <strong>Teléfono</strong>
                <div>+56 9 1234 5678</div>
              </div>
            </div>

            <div className="contact-row">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8l8.5 6L20 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <div>
                <strong>Correo</strong>
                <div>contacto@senafim.com</div>
              </div>
            </div>

            <div className="contact-row">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 6-9 11-9 11s-9-5-9-11a9 9 0 1 1 18 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <div>
                <strong>Dirección</strong>
                <div>Av. Industrial 1234, Santiago, Chile</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default Contact
