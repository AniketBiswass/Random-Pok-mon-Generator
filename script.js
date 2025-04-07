document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const pokemonDisplay = document.getElementById('pokemon-display');
    const loading = document.getElementById('loading');
    
    generateBtn.addEventListener('click', generateRandomPokemon);
    
    async function generateRandomPokemon() {
        // Show loading spinner
        pokemonDisplay.classList.add('hidden');
        loading.classList.remove('hidden');
        
        try {
            // Generate a random Pokémon ID (1-898 for all main series Pokémon)
            const randomId = Math.floor(Math.random() * 898) + 1;
            
            // Fetch Pokémon data from PokeAPI
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const data = await response.json();
            
            // Extract the data we need
            const pokemon = {
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
                types: data.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', '),
                height: (data.height / 10).toFixed(1) + ' m', // Convert from decimeters to meters
                weight: (data.weight / 10).toFixed(1) + ' kg', // Convert from hectograms to kilograms
                abilities: data.abilities.map(ability => {
                    return ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1);
                }).join(', ')
            };
            
            // Update the DOM with the Pokémon data
            document.getElementById('pokemon-name').textContent = pokemon.name;
            document.getElementById('pokemon-image').src = pokemon.image;
            document.getElementById('pokemon-image').alt = pokemon.name;
            document.getElementById('pokemon-type').textContent = pokemon.types;
            document.getElementById('pokemon-height').textContent = pokemon.height;
            document.getElementById('pokemon-weight').textContent = pokemon.weight;
            document.getElementById('pokemon-abilities').textContent = pokemon.abilities;
            
            // Hide loading and show Pokémon
            loading.classList.add('hidden');
            pokemonDisplay.classList.remove('hidden');
            
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            loading.classList.add('hidden');
            alert('Failed to fetch Pokémon data. Please try again.');
        }
    }
});