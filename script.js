document.addEventListener('DOMContentLoaded', function() {
  const downloadYoutubeBtn = document.getElementById('downloadYoutubeBtn');
  const youtubeUrlInput = document.getElementById('youtubeUrl');
  const youtubeDownloadLink = document.getElementById('youtubeDownloadLink');
  
  const downloadInstagramBtn = document.getElementById('downloadInstagramBtn');
  const instagramUrlInput = document.getElementById('instagramUrl');
  const instagramDownloadLink = document.getElementById('instagramDownloadLink');

  downloadYoutubeBtn.addEventListener('click', async function() {
    const videoUrl = youtubeUrlInput.value.trim();
    if (videoUrl) {
      try {
        const response = await fetch('/api/download/youtube', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: videoUrl })
        });

        const data = await response.json();
        if (data.success) {
          const link = document.createElement('a');
          link.href = data.url;
          link.textContent = 'Download YouTube Video';
          link.classList.add('block', 'text-blue-500', 'hover:text-blue-600', 'mt-2');
          youtubeDownloadLink.innerHTML = ''; // Clear previous links
          youtubeDownloadLink.appendChild(link);
        } else {
          // Handle error
          youtubeDownloadLink.textContent = 'Error: ' + data.error;
        }
      } catch (error) {
        youtubeDownloadLink.textContent = 'Error: ' + error.message;
      }
    }
  });

  downloadInstagramBtn.addEventListener('click', async function() {
    const videoUrl = instagramUrlInput.value.trim();
    if (videoUrl) {
      try {
        const response = await fetch('/api/download/instagram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: videoUrl })
        });

        const data = await response.json();
        if (data.success) {
          const link = document.createElement('a');
          link.href = data.url;
          link.textContent = 'Download Instagram Reel';
          link.classList.add('block', 'text-pink-500', 'hover:text-pink-600', 'mt-2');
          instagramDownloadLink.innerHTML = ''; // Clear previous links
          instagramDownloadLink.appendChild(link);
        } else {
          // Handle error
          instagramDownloadLink.textContent = 'Error: ' + data.error;
        }
      } catch (error) {
        instagramDownloadLink.textContent = 'Error: ' + error.message;
      }
    }
  });
});
