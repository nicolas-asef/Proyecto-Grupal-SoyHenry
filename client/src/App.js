import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home,LandingPage,NavBar,Footer,About, SearchBar } from './components'
import Catalog from './components/Catalog/Catalog'
import Worker from './components/Worker/Worker';
import SettingsProfile from './components/SettingsProfile/SettingsProfile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import OnBoarding from './components/OnBoarding/OnBoarding';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={ 
          <ProtectedRoute>
            <LandingPage/>
          </ProtectedRoute>
        } />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/profile/:id' element = {<Worker/>}/>
        <Route path='/profile/settings' element={<SettingsProfile/>} />
        <Route path='/catalog' element={<Catalog/>}/>
        <Route path='/onboarding' element={ <OnBoarding /> } />
      </Routes>
    </div>
  );
}

export default App;
