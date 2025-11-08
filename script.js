const form = document.querySelector("form");
const modal = document.getElementById("successModal");
const closeBtn = document.getElementById("closeModal");
const submitBtn = form.querySelector('button[type="submit"]');
const loadingDiv = document.getElementById('loading');

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  form.reset();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    form.reset();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  submitBtn.disabled = true;
  loadingDiv.style.display = 'block';

  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', form.action, true);
  
  xhr.onload = function() {
    loadingDiv.style.display = 'none';
    submitBtn.disabled = false;
    if (xhr.status === 200 && xhr.responseText.trim() === 'Success') {
      modal.style.display = 'flex';
    } else {
      alert('Ralat! Sila cuba lagi.');
    }
  };
  
  xhr.onerror = function() {
    loadingDiv.style.display = 'none';
    submitBtn.disabled = false;
    alert('Ralat rangkaian! Sila semak sambungan internet anda.');
  };
  
  xhr.send(formData);
});
