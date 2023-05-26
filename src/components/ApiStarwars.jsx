import React from 'react'
const ApiStarwars = () => {

const [personajes, setPersonajes] = React.useState([]);
const [paginacion, setPaginacion] = React.useState(0);

const TraerPersonajes = async (page) => {
    try {
      const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
      const { results } = await res.json();

      const personajesConImagen = results.map((personaje) => ({
        ...personaje,
        image: `https://starwars-visualguide.com/assets/img/characters/${extractIdFromUrl(personaje.url)}.jpg`,
      }));

      setPersonajes(personajesConImagen);
      console.log(personajesConImagen);
    } catch (error) {
      console.log(error);
    }
  };
  const siguiente = () => {
    setPaginacion(paginacion + 1);
    TraerPersonajes(paginacion + 1);
  };

  const atras = () => {
    if (paginacion > 1) {
      setPaginacion(paginacion - 1);
      TraerPersonajes(paginacion - 1);
    }
  };

  const extractIdFromUrl = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  };
  return (
      <div>
        <h1>Petición al Api de Star Wars</h1>
        <img src='https://i.pinimg.com/originals/b6/af/5a/b6af5aeff0ee43a4253fc70c167bb6db.png' class='img1'></img>
        <button onClick={atras}>Atrás</button>
        <button onClick={siguiente}>Siguiente</button>

        {
          personajes.map(({name, eye_color, gender, mass, image}) => (

            <div key= {name}>
                <h3>Nombre: {name}</h3>
                <h4>Color de ojos: {eye_color}</h4>
                <h4>Género: {gender}</h4>
                <h4>Peso en Kg: {mass}</h4>
               <img src={image} alt={name} />
              </div>
          )
          )
        }

      </div>
  );
}

export default ApiStarwars