import { BASE_API_URL } from './apiConfig'

export function submitApplication(formData) {
  return fetch(`${BASE_API_URL}/api/applications`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  })
}
