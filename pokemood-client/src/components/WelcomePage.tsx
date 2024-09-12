import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const POKEMON_SPECIES_API_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

const WelcomePage = () => {

  const [name, setName] = useState<string>(''); // To store the user's name
  const [submittedName, setSubmittedName] = useState<string | null>(null); // To store the submitted name
  const [pokemonList, setPokemonList] = useState<string[]>([]); // To store the Pokémon names

  // Function to handle the name input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedName(name);
    fetchRandomPokemon(); // Fetch Pokémon names after form submission
  };

  // Fetch 3 random Pokémon names (in French) from the PokéAPI
  const fetchRandomPokemon = async () => {
    const randomPokemon = [];
    for (let i = 0; i < 3; i++) {
      const randomId = Math.floor(Math.random() * 151) + 1; // Generate a random ID between 1 and 151 (Gen 1 Pokémon)
      const response = await fetch(`${POKEMON_SPECIES_API_URL}${randomId}`);
      const data = await response.json();

      // Find the French name from the 'names' array
      const frenchName = data.names.find((nameObj: { language: { name: string, url: string } }) => nameObj.language.name === 'fr');
      randomPokemon.push(frenchName ? frenchName.name : 'Nom non trouvé'); // Add the French name or a fallback
    }
    setPokemonList(randomPokemon); // Update the state with the list of random Pokémon names
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bien le bonjour. Quel est ton nom ?</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput">Nom: </label>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={handleInputChange}
          placeholder="Entrez votre nom"
          required
        />
        <button type="submit" style={{ marginLeft: '10px' }}>
          Soumettre
        </button>
      </form>

      {/* Display the submitted name and random Pokémon */}
      {submittedName && (
        <div style={{ marginTop: '20px' }}>
          <h2>Salut {submittedName}!</h2>
          <h3>Voici 3 Pokémon pour toi. Lequel choisis-tu ?</h3>
          <ul>
            {pokemonList.map((pokemon, index) => (
              <li key={index}>
                <Link to={'/community'} state={{ name: submittedName }}>
                  {pokemon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default WelcomePage