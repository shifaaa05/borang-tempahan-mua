// Listen for form submission
const form = document.querySelector("form");
const modal = document.getElementById("successModal");
const closeBtn = document.getElementById("closeModal");

// Close modal when button is clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Optional: close when clicking outside modal content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const submitBtn = form.querySelector('button[type="submit"]');
const loadingDiv = document.getElementById('loading');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // 1. Show loading state
  submitBtn.disabled = true;
  loadingDiv.style.display = 'block';

  try {
    const formData = new FormData(form);
    const response = await fetch('https://script.google.com/macros/s/AKfycbwong5dvvmSvV1ZVFvOlT3Dke3e3Sx1M0kwAEIQ9vPd9ZUMvjYkqhAn7RXW5u7DjFbk0w/exec', {
      method: 'POST',
      body: formData,
    });

    const text = await response.text();

    // 2. Hide loading
    loadingDiv.style.display = 'none';
    submitBtn.disabled = false;

    // 3. Show success modal if Google replied "Success"
    // 3. Handle Google Script reply
    if (text === 'Success') {
        document.getElementById('successModal').style.display = 'flex';
    } else if (text === 'duplicate') {
        alert('Anda telah membuat tempahan pada tarikh dan masa yang sama.');
    } else {
        alert('Ralat! Sila cuba lagi.');
    }

  } catch (err) {
    // 4. Handle network errors
    loadingDiv.style.display = 'none';
    submitBtn.disabled = false;
    alert('Error submitting form: ' + err.message);
  }
});
