// import Card from 'react-bootstrap/Card';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import World from './Pages/WorldPage'
import CountryPage from './Pages/CountryDetails'
function App() {
  return (
    <>
      {/* <div className='row'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Card 1</Card.Title>
            <Card.Text>Card description goes here.</Card.Text>
          </Card.Body>
        </Card>
        
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Card 2</Card.Title>
            <Card.Text>Another card content.</Card.Text>
          </Card.Body>
        </Card>
      </div> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<World/>}/>
          <Route path='/country/:name' element={<CountryPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
