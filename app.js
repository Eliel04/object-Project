// script.js
const charactersContainer = document.getElementById("characters-container");
const btnSearch = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

const fetchCharacters = async (query) => {
  charactersContainer.innerHTML = '';
  charactersContainer.style.display = 'none';
  if (!query) return;
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Not found');
    const data = await response.json();
    const results = Array.isArray(data.results) ? data.results : [];
    // Match name exactly (case-insensitive)
    const matched = results.filter(c => c.name && c.name.toLowerCase() === query.toLowerCase());

    if (matched.length) {
      matched.forEach(character => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${character.image}" alt="${character.name}" class="character-image">
          <p class="character-detail"><span class="attribute">Name:</span> ${character.name}</p>
          <p class="character-detail"><span class="attribute">Status:</span> ${character.status}</p>
          <p class="character-detail"><span class="attribute">Species:</span> ${character.species}</p>
        `;
        charactersContainer.appendChild(card);
      });
      charactersContainer.style.display = 'flex';
    } else {
      charactersContainer.innerHTML = `<p class ="error-message">Name not found</p>`;
      charactersContainer.style.display = 'block';
    }
  }
  catch (error) {
    charactersContainer.innerHTML = `<p class ="error-message">Name not found</p>`;
    charactersContainer.style.display = 'block';
  }
};

btnSearch.addEventListener('click', () => {
  const query = searchInput.value.trim();
  fetchCharacters(query);
});

// allow Enter key to trigger search
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    btnSearch.click();
  }
});






/*fetch('https://rickandmortyapi.com/api/character')
.then(response => {
    if (!response.ok) {
        throw new Error("Cannot fetch data from API")
    }
    return response.json();
})
.then(data => {
  if (charactersContainer && Array.isArray(data.results)) {
    data.results.forEach(character => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" class="character-image">
        <p class="character-detail"><span class="attribute">Name:</span> ${character.name}</p>
        <p class="character-detail"><span class="attribute">Status:</span> ${character.status}</p>
        <p class="character-detail"><span class="attribute">Species:</span> ${character.species}</p>
      `;
      
      charactersContainer.appendChild(card);
    });
  }
})
.catch(error => {
    console.error("Error fetching data:", error);
}*/
