import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Form,Home,LandingPage,NavBar,Footer,About, SearchBar } from './components'
import Catalog from './components/Catalog/Catalog'
import Worker from './components/Worker/Worker';
import SettingsProfile from './components/SettingsProfile/SettingsProfile';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/profile/:id' element = {<Worker/>}/>
        <Route path='/profile/settings' element={<SettingsProfile/>} />
        <Route path='/users/login' element={ <Form /> }/>
        <Route path='/users/register' element={ <Form /> }/>
        <Route path='/catalog' element={<Catalog/>}/>
      </Routes>
    </div>
  );
}

export default App;
