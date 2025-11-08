// Listen for form submission
const form = document.querySelector("form");
const modal = document.getElementById("successModal");
const closeBtn = document.getElementById("closeModal");

// Close modal when button is clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  form.reset(); // Reset form after closing modal
});

// Optional: close when clicking outside modal content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    form.reset();
  }
});

const submitBtn = form.querySelector('button[type="submit"]');
const loadingDiv = document.getElementById('loading');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // 1. Show loading state
  submitBtn.disabled = true;
  loadingDiv.style.display = 'block';

  try {
    const formData = new FormData(form);

    // Use XMLHttpRequest (better for Apps Script CORS)
    const xhr = new XMLHttpRequest();
    xhr.open('POST', form.action, true);

    xhr.onload = function() {
      loadingDiv.style.display = 'none';
      submitBtn.disabled = false;

      if (xhr.status === 200) {
        const text = xhr.responseText.trim();

        if (text === 'Success') {
          modal.style.display = 'flex';
        } else if (text === 'duplicate') {
          alert('Anda telah membuat tempahan pada tarikh dan masa yang sama.');
        } else {
          alert('Ralat! Sila cuba lagi. Respons: ' + text);
        }
      } else {
        alert('Ralat! Status: ' + xhr.status);
      }
    };

    xhr.onerror = function() {
      loadingDiv.style.display = 'none';
      submitBtn.disabled = false;
      alert('Ralat rangkaian! Sila semak sambungan internet anda.');
    };

    xhr.send(formData);

  } catch (err) {
    // Handle unexpected JS errors
    loadingDiv.style.display = 'none';
    submitBtn.disabled = false;
    alert('Error submitting form: ' + err.message);
  }
});
