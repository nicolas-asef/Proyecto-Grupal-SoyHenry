import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Form } from './components'
import Worker from './components/Worker/Worker';

function App() {
  return (
    <Routes>
      <Route path = '/worker/:id' element = {<Worker/>}/>
      <Route path='/users/login' element={ <Form /> }/>
      
    </Routes>
  );
}

export default App;
