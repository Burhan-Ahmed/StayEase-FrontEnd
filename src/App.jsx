import React from 'react'
import { Link, BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from './pages/Login'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import RegisterRoom from './components/Admin/RegisterRoom'
import RoomsList from './pages/Rooms'
import PayStrip from './pages/PayStripe'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import Dashboard from './components/Admin/AdminDashboard/DashBoard'
import AdminDashboard from './components/Admin/AdminDashboard/AdminHeader'
import ReviewsNotifications from './components/Admin/AdminDashboard/Notification'
import ManageEmployees from './components/Admin/AdminDashboard/ViewEmploye'
import ProtectedRoute from './components/ProtectedRoute';


const stripePromise = loadStripe('pk_test_51Po8bQ00CRSlFa1VDLT5dhqs73gtOtNTVnF4fiRPFLXb3DIdjbM1lpyqMmBPLX22db3BIqEvCrMs1j7kGxi4o9UD00YRdF1Tm0')

const ConditionalHeader = () => {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/AdminDashboard')
  return isDashboard ? <AdminDashboard /> : <Header />
}

function App() {
  return (
    <BrowserRouter>
      <ConditionalHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Rooms" element={<RoomsList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/payment/:id"
          element={
            <Elements stripe={stripePromise}>
              <PayStrip />
            </Elements>
          }
        />
        <Route path="/AdminDashboard/*" element={<ProtectedRoute isAdmin={true} />}>
          <Route element={<Dashboard />}>
            <Route index element={<ReviewsNotifications />} />
            <Route path="manageRooms" element={<RegisterRoom />} />
            <Route path="reviewsNotifications" element={<ReviewsNotifications />} />
            <Route path="manageEmployees" element={<ManageEmployees />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

