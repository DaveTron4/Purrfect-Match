import { useState } from 'react'
import './App.css'
import BannedAttributes from './components/BannedAttributes.jsx'
import PreviousCats from './components/PreviousCats.jsx';

const ACCES_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [currentImage, setCurrentImage] = useState(null) // store current image
  const [prevImages, setPrevImages] = useState([]); // store previous images
  const [bannedAttributes, setBannedAttributes] = useState([]); // store banned attributes
  const [loading, setLoading] = useState(false); // store loading state
  const [jsonData, setJsonData] = useState(null); // store json data
  const [error, setError] = useState(null); // store error
  const [breeds , setBreeds] = useState([]); // store breeds
  const [prevBreeds, setPrevBreeds] = useState([]); // store previous breeds
  const [attributeClicked, setAttributeClicked] = useState(false); // store attribute clicked state

  const getCat = async (retryCount = 0) => {
    setLoading(true); // set loading to true
    setError(null); // reset error
    setJsonData(null); // reset json data
    setCurrentImage(null); // reset current image
    setBreeds([]); // reset breeds
    setAttributeClicked(false); // reset attribute clicked state


    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${ACCES_KEY}&has_breeds=1&mime_types=jpg,png&limit=1`); // fetch image
      const json = await response.json(); // parse response
      const breedData = json[0].breeds[0]; // get breed data

      if (
        bannedAttributes.includes(breedData.name) ||
        bannedAttributes.includes(breedData.weight.imperial) ||
        bannedAttributes.includes(breedData.life_span)
      ) {
        if (retryCount < 5) {
          getCat(retryCount + 1); // if the breed name, weight or lifespan is in the banned attributes, retry fetching a new cat image
        } else {
          throw new Error("Too many retries. No valid cat found.");
        }
      }

      setJsonData(json); // set json data
      setCurrentImage(json[0].url); // set current image
      setPrevImages([...prevImages, json[0].url]); // add current image to previous images
      setBreeds([{name: breedData.name, weight: breedData.weight.imperial, lifespan: breedData.life_span}]); // set breeds
      setPrevBreeds([...prevBreeds, {name: breedData.name, weight: breedData.weight.imperial, lifespan: breedData.life_span}]); // add current breeds to previous breeds
    } catch (err) {
      setError(err.message); // set error
    } finally {
      setLoading(false); // set loading to false
    }
  }

  const banAttribute = (attribute) => {
    setAttributeClicked(true); // set attribute clicked to true
    setBannedAttributes((prev) => [...prev, attribute]);
  }
  
  return (
    <div className="App">
      <h1>Purrfect Match</h1>
      <h2>Look for your favorite cats by banning attributes you don't like</h2>
      
      {currentImage && <img src={currentImage} alt="Cat" width="300px" />}
      

      {breeds && <div className = "attribute-buttons-div">
        {breeds.map((breed, index) => (
          <>
            <button onClick = {() => banAttribute(breed.name)} disabled = {attributeClicked}>{breed.name}</button>
            <button onClick = {() => banAttribute(breed.weight)} disabled = {attributeClicked}>{breed.weight} lbs</button>
            <button onClick = {() => banAttribute(breed.lifespan)} disabled = {attributeClicked}>{breed.lifespan} years</button>
          </>
        ))}
      </div>}
      <button onClick={getCat} disabled = {loading}>{loading ? "Getting Cat..." : "Get Cat!"}</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <PreviousCats prevImages = {prevImages} prevBreeds = {prevBreeds}/>
      <BannedAttributes bannedAttributes = {bannedAttributes} setBannedAttributes = {setBannedAttributes}/>
    </div>
  )
}

export default App
