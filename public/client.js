//Client-side (JavaScript file connected to HTML)
//You will have a JavaScript file linked to your HTML page.
//This JavaScript file will send a request to your Express server (app.js).
//Once the data is received from the server, this JavaScript file will handle displaying the data on the HTML page

document.getElementById('searchForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const query = document.getElementById('query').value;
  const resultsContainer = document.getElementById('results');
  resultsContainer.textContent = 'Loading...';

  try {
      const response = await fetch(`/search`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
      });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      resultsContainer.innerHTML = '';
      if (data.length === 0) {
          resultsContainer.textContent = 'No results found.';
      } else {
          data.forEach(track => {
              const trackElement = document.createElement('div');
              trackElement.className = 'track';
              trackElement.innerHTML = `<strong>${track.track}</strong> by ${track.artist}`;
              resultsContainer.appendChild(trackElement);
          });
      }
  } catch (error) {
      resultsContainer.textContent = `Error: ${error.message}`;
  }
});
