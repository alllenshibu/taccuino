import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { useCookies } from "react-cookie"

import Layout from "./layouts/Layout"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  const [cookies, setCookie, removeCookie] = useCookies('token')

  useEffect(() => {
    if (!cookies?.token || cookies.token === "undefined") {
      console.log("Not authenticated")
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/notes/:id" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
