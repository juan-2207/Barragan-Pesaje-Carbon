import { BASE_API_URL } from './apiConfig'

export async function getVacancies() {
  const response = await fetch(`${BASE_API_URL}/api/puestos`, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('No se pudieron obtener las vacantes')
  }
  return response.json()
}

export async function getVacancyById(id) {
  const response = await fetch(`${BASE_API_URL}/api/puestos/${id}`, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('No se pudo obtener la vacante')
  }
  return response.json()
}
