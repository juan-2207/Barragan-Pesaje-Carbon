import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Contact from './pages/Contact'
import VacancyDetails from './pages/VacancyDetails'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vacancy/:id" element={<VacancyDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
