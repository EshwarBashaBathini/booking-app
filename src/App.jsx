import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/homepage'
import TrainList from './components/trainlist'
import Payment from './components/payment'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetails from './components/bookdetails'
import BookedStatus from './components/booked'
import Register from './components/autho/register'
import Login from './components/autho/login'
import TrainDetails from './components/trainDetails'
import NotFound from './components/notfound'
import ProtectedRoute from './components/protectRoute'
import PublicRoute from './components/publicRoute'

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<TrainList />} />
        <Route path="/book/:name/:date" element={<ProtectedRoute><BookDetails /></ProtectedRoute>} />
        <Route path="/payment/:name/checkout" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path='/payment/:trainNumber/booked/:id' element={<ProtectedRoute><BookedStatus /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/train/:id' element={<TrainDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>

    // <TrainDetails />

  )
}

export default App
