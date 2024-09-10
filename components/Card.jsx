import React, {useState, useEffect} from 'react' // the use hooks are being destructed in place from React library, hence the {} brackets
import Counter from './Counter'
import axios from 'axios' // the API

const Card = ({ item }) => { // declaring variable Card

  // these cards are a STATEFUL COMPONENT, they can hold their own state
const [pokemon, setPokemon] = useState({}); // GETTER gets the value of a property, SETTER sets the value
// it is now an empty OBJECT and not an empty ARRAY because this is for individual items, not everything in the array
const [showAbilities, setShowAbilities] = useState(false); // State to manage visibility

const [seeType, setSeeType] = useState(false);


  useEffect(() => {

      axios({
        method: "GET", // this get request is no longer for JSON, it's the URL for an individual object
        url: item.url
      })
        .then(res => setPokemon(res.data))
        .catch(err => console.log("err", err))
  }, []); // depency array; stops it from being an endless loop and constantly re-rendering/re-calling API

  const toggleAbilities = () => {
    setShowAbilities(prevState => !prevState); //toggle visibility function/state to hold a boolean

    
  };

 
  

  return ( // after a return, you always 'escape ingto Javascript'/need to use {}
    <>


    {console.log("item", item)}
    <div style={{ border: 'solid red 3px', marginTop: '20px', color: 'teal', background: 'black',}}>

      <p style={{color: 'red', fontSize: '40px', fontFamily: 'fantasy'}}>
        {item.name}
      </p>
      <p>
        {item.url}
      </p>
      <img src={pokemon?.sprites?.front_default} alt={pokemon.name} />
      <p style={{color: 'orange', fontSize: '30px', fontFamily: 'fantasy'}}>abilities</p>


      <button /*button to toggle to abilities */ onClick={toggleAbilities}> 
        {showAbilities ? 'No wait, its a Secret! Hide them!' : 'Check Out My Abilities!'} 
      </button>

      {showAbilities && ( //&& (logical & operator) means if showAbilities is truthy, show this map; abilities is a stateful component
      // terenary statement (syntax: CONDITION ? :) is conditional/has defined conditions for both/if-else: if truthy, this block if falsey, this block; && operator is an if truthy do this or not
        <div> 
          {pokemon.abilities?.map((ability, i) => (
              <p key={i} style={{ fontFamily: 'cursive' }}>
                {ability.ability.name}
              </p>
            )) || <p>No abilities found</p>}
          </div>
        )}

        <br></br>
        <p style={{color: 'orange', fontSize: '30px', fontFamily: 'fantasy'}}>type</p>
        <button onClick={() => setSeeType(!seeType)}>Am I Your Type?</button>

        {seeType &&
        pokemon?.types?.map((item) => {
          return (
            <div>{item?.type.name}</div>
          )
        })}

<br></br>

      <Counter />

    </div>
    
    
    </>
  )
}

export default Card