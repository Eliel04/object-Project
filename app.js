// script.js
const charactersContainer = document.getElementById("characters-container");

fetch('https://rickandmortyapi.com/api/character')
.then(response => {
    if (!response.ok) {
        throw new Error("Cannot fetch data from API")
    }
    return response.json();
})
.then(data => {
  if (data.results && Array.isArray(data.results)) {
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
})