import React, { useState, useEffect } from "react"
import "./index.css"
import PokemonList from './PokemonList'
import Pagination from "./Pagination";
import axios from "axios";


function App() {
  const [pokemon,setPokemon] = useState([])
  const [currentPageUrl,setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [previousPageUrl, setPreviousPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  let cancel

  useEffect(() => {
    setLoading(true);

    axios.get(currentPageUrl, {
      cancelToken : new axios.CancelToken(c => cancel = c)
    }).then(res =>{
    setLoading(false)
    setNextPageUrl(res.data.next)
    setPreviousPageUrl(res.data.previous)
    setPokemon(res.data.results.map(p => p.name))

    return() => cancel()
    
  })

  }, [currentPageUrl])

  function goToNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage(){
    setCurrentPageUrl(previousPageUrl)
  }
  
  if(loading) return "Loading...."
  

  return (
    <div id="div1">
    <h1>Pokemon Names Generator</h1>
    <div id="div2"><PokemonList pokemon={pokemon} /></div>
    <div id="div3"><Pagination   
    goToNextPage={nextPageUrl ? goToNextPage : null}
    goToPrevPage={previousPageUrl ? goToPrevPage : null}
    /></div>
    </div>
  );
}

export default App;
