// version.js

function getVersionOfPortfolio() {
    fetch(`https://api.github.com/repos/sudeep-m-shetty/Portfolio/releases/latest`)
      .then((response) => {
        return response.json();
      })
      .then((release) => {
        document.getElementById('version').innerHTML =
          `- <a href="${release.html_url}" target="_blank" rel="noopener">${release.tag_name}</a>`;
      });
  }
  
  getVersionOfPortfolio();
  