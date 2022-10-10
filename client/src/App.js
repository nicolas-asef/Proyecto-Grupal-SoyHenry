import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home,LandingPage,NavBar,Footer,About, SearchBar } from './components'
import Catalog from './components/Catalog/Catalog'
import Worker from './components/Worker/Worker';
import SettingsProfile from './components/SettingsProfile/SettingsProfile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import OnBoarding from './components/OnBoarding/OnBoarding';
import Payment from './components/Payment/Payment';
import DashBoardUser from './components/DashboardUser/DashBoardUser';
import CardContracts from './components/CardContracts/CardContracts';
import { NestedModal } from './components/Payment/NestedModal';


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
        <Route path='/profile/settings/premium' element={<Payment/>}/>
        <Route path='/catalog' element={<Catalog/>}/>
        <Route path = '/dashboard/user/:id' element = {<DashBoardUser/>}/>
        <Route path = '/contracts/user/:id' element = {<CardContracts/>}/>
        <Route path='/onboarding' element={ <OnBoarding /> } />
        <Route path='/popUpSuccess' element={ <NestedModal/>}/>
        <Route path='/popUpError' element={ <NestedModal/>}/>
      </Routes>
    </div>
  );
}

export default App;
