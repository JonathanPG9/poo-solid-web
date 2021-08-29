const searchValue = document.getElementById("searchValue")
const form = document.getElementById("formularioCreacion")

class Character {

  constructor (name,origen,species,img,id,gender) {
    this.name = name;
    this.origen = origen;
    this.species = species;
    this.img = img;
    this.id = id;
    this.gender = gender;
  }

}

class CreateInDom {

  static createCard = (where,character) => {
    const padre = document.createElement("article")
    const img = document.createElement('img')
    padre.setAttribute("species",`${ character.origin?.name.slice(0,6) || character.origen } - ${character.species}`)
    padre.setAttribute("gender",`${character.gender}`)
    img.setAttribute("src",`${character.image || character.img}`)
    padre.textContent = `${character.name}`
    padre.appendChild(img)
    padre.className = "contenedor_inf"
    padre.id = `${character.id}`
    img.classList = "contenedor_i"
    const abuelo = document.querySelector(`${where}`)
    Insert.insertarEnElDom(abuelo,padre)
  }

  static createLi = (result) => {
    const ul = document.getElementById("result_ul")
    ul.innerHTML = ""
    for(let i = 0; i < result.length; i++) {
      const li = document.createElement("li")
      const img = document.createElement("img")
      img.setAttribute("src",`${result[i].image}`)
      img.classList = 'result_i'
      li.classList = 'result_li'
      li.id = `${result[i].id}`
      li.setAttribute("name",result[i].name)
      Insert.insertarEnElDom(li,img)
      li.addEventListener("click", (e) => {
        this.getResult(e.currentTarget.id)
        searchValue.value = ""
        ul.innerHTML = ""
      })
      Insert.insertarEnElDom(ul,li)
    }
  }

}

class Insert {

  static callFour = async () => {
    const callApi = await fetch("https://rickandmortyapi.com/api/character/1,2,3,4,5")
    const characters = await callApi.json()
    for(let i = 0; i < characters.length ; i++) {
      CreateInDom.createCard(".contenedor",characters[i])
    }
  }
  static insertarEnElDom = (padre,hijo) => {
    padre.appendChild(hijo)
  } 

}

class Search {

  static getSearch = async () => {
    const search = searchValue.value
    try
    {
      const callApi = await fetch(`https://rickandmortyapi.com/api/character/?name=${search}&status=alive`)
      const result = await callApi.json()
      CreateInDom.createLi(result.results)
    }
    catch{
      throw new Error ("No existe personaje")
    }
  }

  static getResult = async (id) => {
    try
    {
      const callApi = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
      const result = await callApi.json()
      CreateInDom.createCard(".contenedor",result)
    }
    catch{
      alert("error")
    }
  }
}

class Creation {

  static submitSearch = (event) => {
    const Form = new FormData(form)
    event.preventDefault()
    event.target.reset()
    this.creationCustom(Form)
  } 

  static creationCustom = (formData) => {
    const newCharacter = new Character(
      formData.get("name"),
      formData.get("origin"),
      formData.get("species"),
      formData.get("image"),
      123,
      formData.get("gender"),
    )
    CreateInDom.createCard(".contenedor",newCharacter)
  }

}

Insert.callFour()

const newPersonaje = new Character (
"Test","Tierra", "Humano" ,
"https://finde.latercera.com/wp-content/uploads/2020/06/Amor-de-gata-2-700x450.jpg"
,121,"Mujer"
)

CreateInDom.createCard(".contenedor",newPersonaje)

searchValue.addEventListener("keyup",Search.getSearch)
form.addEventListener("submit",Creacion.submitSearch)