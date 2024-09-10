import React, { useState, useEffect } from 'react' // the use hooks are being destructed in place from React library, hence the {} brackets
import axios from 'axios' // the API
import Card from './Card'

// all a COMPONENT is, is a FUNCTION CALL

const Pokemon = () => {
    const [poke, setPoke] = useState([]) // DEFAULT STATE is an EMPTY ARRAY because that's where the manipulated JSON goes

    const [search, setSearch] = useState("") // an empty string is a FALSEY VALUE
    useEffect(() => {
        axios({ //use the AXIOS LIBRARY, use the method GET, go to this URL
            method: "GET", //getting info from that URL, whose data/info is being held in state
            url: "https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=200"
        }) //once you have info from that URL, .THEN call it back in console.log
            .then(got => { //got is an arbitrary name
                // console.log(got.data) //if the promise was successful we go into the THEN block
                setPoke(got.data.results)
            })
            .then(got => {
                setPoke(got.data.results)
            })
            .catch(err => console.log("error", err)) //if promise was not successful
    }, [])

    const handleChange = (e) => {
        console.log("handleChange", e.target.value)
        setSearch(e.target.value) 
    }


    return (
        <>
            {console.log("SEARCH VALUE", search)}
            {console.log("POKE", poke)}
            <div style={{fontSize: '50px', fontFamily: 'fantasy',}}>POKEMON FRIENDS</div>

            <input onChange={(e) => handleChange(e)} placeholder='Search'
            value={search || ""} //says this input has a STATIC VALUE of SEARCH; this is a CONTROLLED INPUT; using || (logical OR OPERATOR) means if truthy, return SEARCH if falsey return "" which is the fallback value
            //CONTROLLED INPUT benefits because value is managed by component's state rather than the DOM; helps with data breaches/attacks
            ></input>

            {search.length >= 1 ? //if terenary statement is greater than or equal to 1/ie when user has started typing characters into search bar, screen will show result of filter
              ( //once user starts typing into search, it becomes TRUTHY and the following renders
                poke.filter((item) =>  item.name.startsWith(search)).map((item, i) => {//once filter conditions have been met .map creates a new array with results and renders it to page/.filter has become formula that transforms each element for .map
                    console.log("item", item)
                    return ( //passing all info from above into Card
                        <Card 
                        key={item.name} // key={i} 
                        //inverseData={inverseData}
                        item={item}
                        handleChange={handleChange} />
                    )
                })
              )
              :
              ( //if nothing is being typed into search, it is FALSEY and the following renders/every poke shows
                poke.map((item, i) => { //for every pokemon in this array, return the following component
                    return (
                        <Card 
                        item={item}
                        key={item.name} // key={i}
                        handleChange={handleChange}
                        //inverseData={inverseData}
                        />
                    )
                }
            )
              )
              }
       
        </>
    )
}
export default Pokemon