// import React,{useState,useEffect} from 'react'
// import { useParams } from "react-router-dom";

// function CountryDetails() {
//   const { name } = useParams(); // URL se country ka naam le raha hai
//   const [country, setCountry] = useState(null);

//   useEffect(() => {
//     fetch(`https://restcountries.com/v3.1/name/${name}`)
//       .then((res) => res.json())
//       .then((data) => setCountry(data[0]));
//       // .then((data) =>console.log(data))
//   }, [name]);

//   if (!country) return <h2>Loading...</h2>;
//   return (
//     <div>
//       <h1>{country.name.common}</h1>
//       <img src={country.flags.png} alt={country.name.common} />
//       <p>Capital: {country.capital}</p>
//       <p>Population: {country.population}</p>
//       <p>Region: {country.region}</p>
//       <p>Subregion: {country.subregion}</p>
//     </div>
//   )
// }

// export default CountryDetails
import React,{useEffect, useState} from 'react'
import Container from 'react-bootstrap/esm/Container'
import "./country.css"
import { useNavigate, useParams } from 'react-router-dom'
function CountryDetails() {
  const [dark, setDark] = useState(false)
  const {name} = useParams();
  const [country, setCountry] = useState(null)
  console.log(country)
  const navigate = useNavigate()
  useEffect(()=>{
    fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      setCountry(res[0])})
  },[name])
  return (
    <>
       <div className={`navbar ${dark ? "dark-mode" : "light-mode"}`}>
        <Container>
         <h2>Where in the World?</h2>
             <div className='navChild' onClick={()=> setDark(!dark)}>
              <i className="ri-moon-fill"></i>
              <span>Dark Mode</span>
         </div>
        </Container>
        </div>
        <div className='wrapper' style={{backgroundColor:dark ? "#2B3945" : "#FAFAFA"}}> 
            <button className='btns' onClick={()=> navigate('/')} style={{backgroundColor:dark ? "#2B3945" : "#fff",color: dark ? "#fff" : "#000"}}>
              <i class="ri-arrow-left-long-line"></i> Back
            </button>
            <Container>
            {country && country.flags && (
             <div className='set-country'>
                <img src={country.flags.svg} alt={`${country.name.common} Flag`} />
                <div className='details' style={{color: dark ? "#fff" : "#000"}}>
                  <div className='d-1'>
                    <h4>{country.name.common}</h4>
                    <p>Native Name: {country.altSpellings[1]}</p>
                    <p>Population: {country.population.toLocaleString()}</p>
                    <p>Region: {country.region}</p>
                    <p>Sub Region: {country.subregion}</p>
                    <p>Capital: {country.capital}</p>
                  </div>
                 <div className='d-2'>
                    <p>Top level Domain: {country.tld}</p>
                    <p>Currencies: {Object.values(country.currencies)[0].name}</p>
                    <p>Languages: {country.languages.eng}, {country.languages.urd}</p>
                 </div>
                 <div className='borders'>
                    <p>Border Countries:</p>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap',marginLeft:'15px' }}>

                      {country.borders ?
                        country.borders?.map((border,index)=>(
                          <div key={index} className='border'>
                            {border}
                          </div>
                        )) : <p>This country has no bordering countries</p>
                      }
                      </div>
                 </div>
                </div>
            </div>
            )}
            
            </Container>
        </div>
    </>
  )
}

export default CountryDetails
