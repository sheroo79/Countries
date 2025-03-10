import React,{useState,useEffect} from "react";
import "remixicon/fonts/remixicon.css";
import "./world.css";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

function World() {
    const [countries, setCountries] = useState([]);
    const [inputs, setInputs] = useState('')
    const [dark, setDark] = useState(false)
    const [allCountries, setAllCountries] = useState([])
    const [selectedRegion, setSelectRegion] = useState("")

    const navigate = useNavigate();
    useEffect(() => {
       fetch("https://restcountries.com/v3.1/all?fields=flags,capital,region,population,name")
            .then(res => res.json())
            .then(res => setCountries(res))
            .catch((error) => console.error("Error Fetching Data", error));
    }, []);
    useEffect(()=>{
        const SearchData = countries.filter((country)=>(
            country.name.common.trim().toLowerCase().includes(inputs.trim().toLowerCase())
        ))
        setAllCountries(SearchData)
    },[inputs,countries])
    const handleDelete = () =>{
        setInputs('')
    }

    useEffect(()=> {
        const filterdCountries = selectedRegion ? countries.filter((country)=> country.region === selectedRegion) : countries
        setAllCountries(filterdCountries)
    },[selectedRegion])
    useEffect(() => {
        const wrapperDiv = document.querySelectorAll('.wrapper,.navbar,.card,.set-select,.set-input');
        wrapperDiv.forEach(div =>{
            if (dark) {
                div.classList.add("dark-mode");
                div.classList.remove("light-mode");
            } else {
                div.classList.add("light-mode");
                div.classList.remove("dark-mode");
            }
        })
    }, [dark]);
    
    
    return (
        <>
            <div className="navbar">
                <Container>
                    <h2>Where in the World?</h2>
                    <div className='navChild' onClick={()=> setDark(!dark)}>
                       <i className="ri-moon-fill"></i>
                       <span>Dark Mode</span>
                    </div>
                </Container>
            </div>
            <div className='wrapper'>
                <div className='input-wrapper'>
                    <div className="set-input" style={{backgroundColor: dark? "#2B3945" : "#fff",color:dark? "#fff":"gray"}}>
                        <i className="ri-search-line"></i>
                        <input className="myInput" value={inputs} type='text' placeholder='Search for a country...' onChange={(e) => setInputs(e.target.value)}/>
                        {inputs ? <i class="ri-close-circle-fill" onClick={handleDelete}></i> : ''}
                    </div>
                    <div className='set-select'>
                        <select className="select" onChange={(e)=> setSelectRegion(e.target.value)}>
                        <option value="">Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                        </select>
                    </div>
                </div>

                {/* Main Section */}
                <Container className="mt-5">
                    <Row className="g-5"> 
                        {allCountries.map((data, index) => (
                        <Col md={4} key={index}>
                        <Card className="card" onClick={() => navigate(`/country/${encodeURIComponent(data.name.common)}`)} style={{ 
                                width: '16rem', 
                                borderRadius: '4px',
                                boxShadow: '1px 1px 5px rgba(0,0,0, 0.3)' 
                         }}>
                            <Card.Img variant="top" src={data.flags.svg} className="card-img"/>
                            <Card.Body>
                                 <Card.Title>{data.name.common}</Card.Title>
                                <Card.Text>
                                    <p style={{fontSize:'15px',fontWeight:'400',marginTop:'10px'}}>Population: {data.population.toLocaleString()}<br/>Region: {data.region}<br/>Capital: {data.capital}</p>
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default World;
