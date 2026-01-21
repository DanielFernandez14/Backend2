import "./App.css"
import { useEffect, useState } from "react"

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const fetchingData = async () => {
      const response = await fetch("https://harry-potter-api.onrender.com/personajes")
      const data = await response.json()
      setCharacters(data)
    }

    fetchingData()
  }, [])

  return (
  <>
    <h2>Soy un subtitulo</h2>

    <div className="grid">
      {characters.map((character, index) => (
        <div
          className="card"
          key={character.id ?? `${character.personaje}-${index}`}
        >
          <img
            src={character.imagen}
            alt={`Imagen de ${character.personaje}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/240x320?text=Sin+imagen"
            }}
          />

          <h2>{character.personaje}</h2>

          <p>
            <strong>Casa:</strong> {character.casaDeHogwarts}
          </p>

          <p>
            <strong>Apodo:</strong> {character.apodo}
          </p>
        </div>
      ))}
    </div>
  </>
)
}

export default App
