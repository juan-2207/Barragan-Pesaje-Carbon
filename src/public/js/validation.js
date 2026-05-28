// Job application buttons
const jobApplyButtons = document.querySelectorAll('.job-apply-btn');
const applicationForm = document.getElementById('application-form');
const selectedJobInfo = document.getElementById('selected-job-info');
const selectedJobTitle = document.getElementById('selected-job-title');
const jobsApplication = document.querySelector('.jobs-application');

jobApplyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const jobTitle = btn.dataset.job;
    selectedJobTitle.textContent = jobTitle;
    document.getElementById('selected-job-input').value = jobTitle;
    selectedJobInfo.style.display = 'block';
    applicationForm.classList.add('active');
    jobsApplication.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Form validation
const form = document.getElementById('application-form');
const statusEl = document.getElementById('status');
const PDFDocument = PDFLib.PDFDocument;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const countryCode = document.getElementById('country-code').value;
  const phoneInput = document.getElementById('phone').value.trim();

  if (!/^\d{10}$/.test(phoneInput)) {
    statusEl.textContent = 'El número de teléfono debe tener exactamente 10 dígitos.';
    statusEl.className = 'error';
    return;
  }

  const resumeFile = document.getElementById('resume').files[0];

  if (resumeFile) {
    const arrayBuffer = await resumeFile.arrayBuffer();
    try {
      const pdf = await PDFDocument.load(arrayBuffer);
      const pageCount = pdf.getPageCount ? pdf.getPageCount() : pdf.getPages().length;
      if (pageCount > 2) {
        statusEl.textContent = 'El currículum no puede exceder las 2 páginas.';
        statusEl.className = 'error';
        return;
      }
    } catch (e) {
      statusEl.textContent = 'Error al leer el archivo PDF.';
      statusEl.className = 'error';
      return;
    }
  }

  const formData = new FormData(form);
  formData.set('phone', `${countryCode} ${phoneInput}`);

  try {
    statusEl.textContent = 'Enviando solicitud...';
    statusEl.className = 'status';

    const response = await fetch('/api/applications', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      statusEl.textContent = 'Solicitud enviada correctamente. ¡Gracias!';
      statusEl.className = 'success';

      form.reset();

      setTimeout(() => {
        statusEl.textContent = '';
        statusEl.className = '';
      }, 5000);

    } else {
      statusEl.textContent = data.mensaje || 'Hubo un error al enviar.';
      statusEl.className = 'error';
    }
  } catch (error) {
    console.error(error);
    statusEl.textContent = 'Error de conexión con el servidor.';
    statusEl.className = 'error';
  }
});