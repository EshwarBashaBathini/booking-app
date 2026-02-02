import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/homepage'
import TrainList from './components/trainlist'
import TrainItem from './components/trainItem'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetails from './components/bookdetails'

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<TrainList />} />
        <Route path="/book/:name/:date" element={ <BookDetails />} />
      </Routes>
    </Router>

   
  )
}

export default App
