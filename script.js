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

  //submit and loading button
  
  submitBtn.disabled = true;
  loadingDiv.style.display = 'block';

  //XML Request because it works better with Google's API

  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', form.action, true);

  //when the modal box should show up
  
  xhr.onload = function() {
    loadingDiv.style.display = 'none';
    submitBtn.disabled = false;
    if (xhr.status === 200 && xhr.responseText.trim() === 'Success') {
      modal.style.display = 'flex';
    } else {
      alert('Ralat! Sila cuba lagi.');
    }
  };

  //error display in case of error
  
  xhr.onerror = function() {
    loadingDiv.style.display = 'none';
    submitBtn.disabled = false;
    alert('Alamak! Ada masalah di sistem kami. Sila cuba sebentar lagi! Atau anda ada isi dua kali?');
  };
  
  xhr.send(formData);
});
