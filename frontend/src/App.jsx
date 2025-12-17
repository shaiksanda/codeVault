import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./components/Home"

import Login from "./components/Login"
import Signup from "./components/Signup"
import CodeVault from "./components/CodeVault"
import SnippetDetail from './components/SnippetDetail'
import NotFound from './components/NotFound'
import ProtectedRoute from "./components/ProtectedRoute"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/code-vault" element={<ProtectedRoute element={<CodeVault />} />} />
        <Route path="/snippet/:id" element={<SnippetDetail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


//logo urls
//https://res.cloudinary.com/dq4yjeejc/image/upload/v1765696484/code_vault_1_skzlz3.webp
//https://res.cloudinary.com/dq4yjeejc/image/upload/v1765696484/code_vault_2_iftcdv.webp
//https://res.cloudinary.com/dq4yjeejc/image/upload/v1765697042/code_vault_3_i5doco.webp

