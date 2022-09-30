import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Form,Home,LandingPage,NavBar,Footer,About, SearchBar } from './components'
import Worker from './components/Worker/Worker';

function App() {
  return (
    <div>
      <NavBar/>
      <SearchBar/>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route  path='/home' element={<Home />} />
      <Route path='/about' element={<About />}/>
      <Route path = '/worker/:id' element = {<Worker/>}/>
      <Route path='/users/login' element={ <Form /> }/>
      <Route path='/users/register' element={ <Form /> }/>
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
