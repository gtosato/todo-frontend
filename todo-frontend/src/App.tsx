import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/HomePage/HomePage';
import CreatePage from './pages/CreatePage/CreatePage';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} /> 

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
