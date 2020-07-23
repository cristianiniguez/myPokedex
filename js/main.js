const API_URL_BASE = 'https://pokeapi.co/api/v2/pokemon/'

const $pokemonForm = document.querySelector('.pokemon-form')
const $pokemonList = document.querySelector('.pokemon-list__container')

$pokemonForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const frmData = new FormData($pokemonForm)
    showPokemon(frmData.get('pokemon-name').toLowerCase())
})

/* FUnctions */

async function getData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error('No se encontró el pokemon')
    }
}

function pokemonTypesTemplate(data) {
    const types = data.types
    let template = ``
    types.forEach((type) => {
        template += `<span>${type.type.name}</span> `
    })
    return template
}

function pokemonTemplate(data) {
    return (
        `<div class="pokemon">
            <img class="pokemon__image" src="${data.sprites.front_default}" alt="">
            <p class="pokemon__name">Name:
                <span>${data.name}</span>
            </p>
            <p class="pokemon__types">Types:
                ${pokemonTypesTemplate(data)}
            </p>
        </div>`
    )
}

async function showPokemon(pokemonName) {
    const URL = `${API_URL_BASE}${pokemonName}`
    try {
        const pokemonData = await getData(URL)
        const pokemonHTML = pokemonTemplate(pokemonData)
        $pokemonList.innerHTML = pokemonHTML
    } catch (error) {
        alert(error.message)
    }
}