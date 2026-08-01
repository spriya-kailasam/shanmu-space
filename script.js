// script.js

// Function to load LM-1 file dynamically
function loadLM1() {
  fetch('LM-1.txt')   // LM-1.txt must be in the same folder
    .then(response => {
      if (!response.ok) {
        throw new Error('File not found');
      }
      return response.text();
    })
    .then(data => {
      // Split into paragraphs for readability
      const paragraphs = data.split(/\r?\n\r?\n/); 
      const container = document.getElementById('lm1-content');
      container.innerHTML = "";
      paragraphs.forEach(p => {
        if (p.trim() !== "") {
          const para = document.createElement('p');
          para.textContent = p.trim();
          container.appendChild(para);
        }
      });
    })
    .catch(error => {
      document.getElementById('lm1-content').innerText = "Unable to load LM-1 content.";
      console.error(error);
    });
}

// Load LM-1 when the page is ready
document.addEventListener('DOMContentLoaded', loadLM1);
