const fetchingData = async () => {
    const response =  await fetch ("https://rickandmortyapi.com/api/character")

    const data = await response.json()
    
    data.results.forEach(character => {
        console.log(character.name)
        console.log(character.gender)
    })
}

fetchingData()

