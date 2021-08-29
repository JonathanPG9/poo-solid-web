const searchValue = document.getElementById("searchValue")
const form = document.getElementById("formularioCreacion")

class Personaje {

  constructor (name,origen,species,img,id,gender) {
    this.name = name;
    this.origen = origen;
    this.species = species;
    this.img = img;
    this.id = id;
    this.gender = gender;
  }

}

class Create {

  static createCard = (abueloParam,personaje) => {
    const padre = document.createElement("article")
    const img = document.createElement('img')
    padre.setAttribute("species",`${ personaje.origin?.name.slice(0,6) || personaje.origen } - ${personaje.species}`)
    padre.setAttribute("gender",`${personaje.gender}`)
    img.setAttribute("src",`${personaje.image || personaje.img}`)
    padre.textContent = `${personaje.name}`
    padre.appendChild(img)
    padre.className = "contenedor_inf"
    padre.id = `${personaje.id}`
    img.classList = "contenedor_i"
    const abuelo = document.querySelector(`${abueloParam}`)
    Insert.insertarEnElDom(abuelo,padre)
  }

}

class Insert {

  static callFour = async () => {
    const llamado = await fetch("https://rickandmortyapi.com/api/character/1,2,3,4,5")
    const personajes = await llamado.json()
    for(let i = 0; i < personajes.length ; i++) {
      Create.createCard(".contenedor",personajes[i])
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
      const llamado = await fetch(`https://rickandmortyapi.com/api/character/?name=${search}&status=alive`)
      const result = await llamado.json()
      this.showSearch(result.results)
    }
    catch{
      throw new Error ("No existe personaje")
    }
  }

  static showSearch = (result) => {
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
      li.appendChild(img)
      li.addEventListener("click", (e) => {
        this.getResult(e.currentTarget.id)
        searchValue.value = ""
        ul.innerHTML = ""
      })
      Insert.insertarEnElDom(ul,li)
    }
  }

  static getResult = async (id) => {
    try
    {
      const llamado = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
      const result = await llamado.json()
      Create.createCard(".contenedor",result)
    }
    catch{
      alert("error")
    }
  }
}

class Creacion {

  static submitSearch = (event) => {
    const Formulario = new FormData(form)
    event.preventDefault()
    event.target.reset()
    this.creacionPersonaje(Formulario)
  } 

  static creacionPersonaje = (formData) => {
    const newCharacter = new Personaje(
      formData.get("name"),
      formData.get("origin"),
      formData.get("species"),
      formData.get("image"),
      123,
      formData.get("gender"),
    )
    Create.createCard(".contenedor",newCharacter)
  }


}

Insert.callFour()

const newPersonaje = new Personaje (
"Test","Tierra", "Humano" ,
"https://finde.latercera.com/wp-content/uploads/2020/06/Amor-de-gata-2-700x450.jpg"
,121,"Mujer"
)

Create.createCard(".contenedor",newPersonaje)

searchValue.addEventListener("keyup",Search.getSearch)
form.addEventListener("submit",Creacion.submitSearch)