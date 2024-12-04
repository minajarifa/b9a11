import Navber from "./Components/Navber/Navber"
import Footer from "./Components/Footer/Footer"
import { Outlet } from 'react-router-dom'

import './App.css'


function App() {


  return (
    <div className="font-bold">
      <div className="mb-10">
        <Navber />
      </div>
      <div className="my-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
