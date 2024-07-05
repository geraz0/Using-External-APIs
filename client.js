//Client-side (JavaScript file connected to HTML)
//You will have a JavaScript file linked to your HTML page.
//This JavaScript file will send a request to your Express server (app.js).
//Once the data is received from the server, this JavaScript file will handle displaying the data on the HTML page

document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.getElementById('query').value;
    
    try {
      const response = await fetch('/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });
  
      if (response.ok) {
        const songs = await response.json();
        displayResults(songs);
      } else {
        const errorData = await response.json();
        displayError(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      displayError('Network error. Please try again later.');
    }
  });
  
  function displayResults(songs) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    songs.forEach(song => {
      const songDiv = document.createElement('div');
      songDiv.innerHTML = `
        <h2>${song.track.title}</h2>
        <p>Artist: ${song.track.subtitle}</p>
        <img src="${song.track.images.coverart}" alt="Cover Art">
      `;
      resultsDiv.appendChild(songDiv);
    });
  }
  
  function displayError(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p style="color: red;">${message}</p>`;
  }
  