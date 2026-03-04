const cache = {};

document.getElementById('searchBtn').addEventListener('click', async () => {
    const input = document.getElementById('pokemonInput').value.toLowerCase();
    if (!input) return;

    if (cache[input]) {
        renderPokemon(cache[input]);
    } else {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        if (res.ok) {
            const data = await res.json();
            cache[input] = data;
            renderPokemon(data);
        } else {
            alert("Not found");
        }
    }
});

function renderPokemon(data) {
    const card = document.getElementById('displayArea');
    card.style.visibility = 'visible'; // Reveal the card
    
    document.getElementById('pokeImg').src = data.sprites.front_default;
    document.getElementById('pokeAudio').src = data.cries.latest;

    const selects = document.querySelectorAll('.move-select');
    selects.forEach(select => {
        select.innerHTML = ''; 
        data.moves.forEach(m => {
            let opt = document.createElement('option');
            opt.value = m.move.name;
            opt.textContent = m.move.name;
            select.appendChild(opt);
        });
    });
}

// Logic for the "Add to Team" button remains the same as previous
document.getElementById('addToTeamBtn').addEventListener('click', () => {
    const container = document.getElementById('teamContainer');
    const img = document.getElementById('pokeImg').src;
    const moves = Array.from(document.querySelectorAll('.move-select')).map(s => s.value);
    
    const div = document.createElement('div');
    div.className = 'team-member';
    div.innerHTML = `<img src="${img}" width="50"> <p>${moves.join(' | ')}</p>`;
    container.appendChild(div);
});