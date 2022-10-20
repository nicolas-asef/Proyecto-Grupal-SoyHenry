import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  LandingPage,
  NavBar,
  Footer,
  About,
  SearchBar,
} from "./components";
import Catalog from "./components/Catalog/Catalog";
import Worker from "./components/Worker/Worker";
import SettingsProfile from "./components/SettingsProfile/SettingsProfile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import OnBoarding from "./components/OnBoarding/OnBoarding";
import Payment from "./components/Payment/Payment";
import Chat from "./components/Chat/Chat";
import DashHome from "./components/Dashboard/Pages/DashHome/DashHome";
import DashAnalytics from "./components/Dashboard/Pages/DashAnalytics/DashAnalytics";
import DashBalance from "./components/Dashboard/Pages/DashBalance/DashBalance";
import DashUsers from "./components/Dashboard/Pages/DashUsers/DashUsers";
import DashWorker from "./components/Dashboard/Pages/DashWorkers/DashWorker";
import DashBoardUser from "./components/DashboardUser/DashBoardUser";
import CardContracts from "./components/CardContracts/CardContracts";
import { NestedModal } from "./components/Payment/NestedModal";
import DashCountry from "./components/Dashboard/Pages/DashCountry/DashCountry";
import DashJobs from "./components/Dashboard/Pages/DashJobs/DashJobs";
import Favorites from "./components/Favorites/Favorites";
import SuperChat from "./components/Chat/SuperChat";
import CarruselWorkersPremium from "./components/CarruselWorkersPremium/CarruselWorkersPremium";
import Mapview from "./components/MapView/MapView";
import { Followers } from "./components/Followers/Followers";
import ProtectedAdmin from "./components/ProtectedAdmin/ProtectedAdmin";
import HomePrueba from "./components/HomePrueba/HomePrueba";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route path="/home" element={<HomePrueba />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/user/:id" element={<Worker type="user" />} />
        <Route path="/profile/:id" element={<Worker type="worker" />} />
        <Route path="/profile/settings" element={<SettingsProfile />} />
        <Route path="/profile/settings/premium" element={<Payment />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/dashboard/user/:id" element={<DashBoardUser />} />
        <Route path="/contracts/user/:id" element={<CardContracts />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedAdmin>
              <DashHome />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            <ProtectedAdmin>
              <DashAnalytics />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/dashboard/balance"
          element={
            <ProtectedAdmin>
              <DashBalance />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedAdmin>
              <DashUsers />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/dashboard/workers"
          element={
            <ProtectedAdmin>
              <DashWorker />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/dashboard/country"
          element={
            <ProtectedAdmin>
              <DashCountry />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/dashboard/jobs"
          element={
            <ProtectedAdmin>
              <DashJobs />
            </ProtectedAdmin>
          }
        />
        <Route path="/chat" element={<SuperChat />} />
        <Route path="/chat/:id" element={<SuperChat />} />
        <Route path="/carruselpremium" element={<CarruselWorkersPremium />} />
        <Route path="/map" element={<Mapview />} />
        <Route path="/followers" element={<Followers />} />
      </Routes>
    </div>
  );
}

export default App;
