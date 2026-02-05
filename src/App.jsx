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

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/book" element={<TrainList />} />
        <Route exact path="/book/:name/:date" element={ <BookDetails />} />
        <Route exact path="/payment/:name/checkout" element={<Payment />} />
        <Route exact path='/payment/:trainNumber/booked/:id' element={<BookedStatus />} />
      </Routes>
    </Router>

   
  )
}

export default App
