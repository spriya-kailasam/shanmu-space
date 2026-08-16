// script.js

// Function to load content from a file and display it in a blog card
function loadArticleFile(folder, fileName, fileIndex) {
  fetch(`${folder}/${fileName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('File not found');
      }
      return response.text();
    })
    .then(data => {
      // Remove "no articles" message if articles are found
      const noArticlesId = folder === 'TM' ? 'no-technology-articles' : 'no-thoughts-articles';
      const noArticlesElement = document.getElementById(noArticlesId);
      if (noArticlesElement) {
        noArticlesElement.style.display = 'none';
      }
      
      // Create blog card
      const section = document.getElementById(folder === 'TM' ? 'technology' : 'thoughts');
      const articlesContainer = document.getElementById(folder === 'TM' ? 'technology-articles' : 'thoughts-articles');
      
      const card = document.createElement('div');
      card.className = 'blog-card';
      
      const contentContainer = document.createElement('div');
      
      // Split into paragraphs for readability
      const paragraphs = data.split(/\r?\n\r?\n/);
      paragraphs.forEach(p => {
        if (p.trim() !== "") {
          const para = document.createElement('p');
          para.textContent = p.trim();
          contentContainer.appendChild(para);
        }
      });
      
      card.appendChild(contentContainer);
      articlesContainer.appendChild(card);
    })
    .catch(error => {
      // File doesn't exist, silently skip
      console.log(`File ${fileName} not found, skipping...`);
    });
}

// Function to dynamically load all files from a folder
function loadArticlesFromFolder(folder, filePrefix) {
  let fileIndex = 1;
  
  function tryLoadNextFile() {
    const fileName = `${filePrefix}-${fileIndex}.txt`;
    
    loadArticleFile(folder, fileName, fileIndex);
    
    fileIndex++;
    // Try to load up to 20 files (you can adjust this number)
    if (fileIndex <= 20) {
      setTimeout(tryLoadNextFile, 100); // Small delay between requests
    }
  }
  
  tryLoadNextFile();
}

// Load articles when the page is ready
document.addEventListener('DOMContentLoaded', () => {
  loadArticlesFromFolder('TM', 'TM');
  loadArticlesFromFolder('TR', 'TR');
});
