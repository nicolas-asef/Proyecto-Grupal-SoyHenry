import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home,LandingPage,NavBar,Footer,About, SearchBar } from './components'
import Catalog from './components/Catalog/Catalog'
import Worker from './components/Worker/Worker';
import SettingsProfile from './components/SettingsProfile/SettingsProfile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import OnBoarding from './components/OnBoarding/OnBoarding';
import Payment from './components/Payment/Payment';
import DashHome from './components/Dashboard/Pages/DashHome/DashHome';
import DashAnalytics from './components/Dashboard/Pages/DashAnalytics/DashAnalytics';
import DashBalance from './components/Dashboard/Pages/DashBalance/DashBalance';
import DashUsers from './components/Dashboard/Pages/DashUsers/DashUsers';
import DashWorker from './components/Dashboard/Pages/DashWorkers/DashWorker';


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
        <Route path='/onboarding' element={ <OnBoarding /> } />
        <Route path='/dashboard' element= { <DashHome />} />
        <Route path='/dashboard/analytics' element= { <DashAnalytics />} />
        <Route path='/dashboard/balance' element= { <DashBalance />} />
        <Route path='/dashboard/users' element= { <DashUsers />} />
        <Route path='/dashboard/workers' element= { <DashWorker />} />

      </Routes>
    </div>
  );
}

export default App;
