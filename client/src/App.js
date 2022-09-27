import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Form } from './components'

function App() {
  return (
    <Routes>
      <Route path='/users/login' element={ <Form /> }/>
    </Routes>
  );
}

export default App;
