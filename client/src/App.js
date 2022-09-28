import './App.css';
import { Route, Routes } from 'react-router-dom';
import Worker from './components/Worker/Worker';
import { Form,LandingPage } from './components'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path = '/worker/:id' element = {<Worker/>}/>
      <Route path='/users/login' element={ <Form /> }/>
      <Route path='/users/register' element={ <Form /> }/>
    </Routes>
  );
}

export default App;
