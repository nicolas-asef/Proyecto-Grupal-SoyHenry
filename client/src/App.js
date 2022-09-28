import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Form } from './components'

function App() {
  return (
    <Routes>
      <Route path='/users/login' element={ <Form /> }/>
      <Route path='/users/register' element={ <Form /> }/>
    </Routes>
  );
}

export default App;
