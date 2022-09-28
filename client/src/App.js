import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Form,LandingPage } from './components'



function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/users/login' element={ <Form /> }/>
    </Routes>
  );
}

export default App;
