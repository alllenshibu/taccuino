import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"
import { useCookies } from "react-cookie"

export default function login() {
  const router = useNavigate()

  const [user, setUser] = useState({
    username: "",
    password: "",
  })

  const [cookies, setCookie] = useCookies(["token"])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/login",
        user
      )
      if (response.status === 200) {
        setCookie("token", response.data.token, { path: "/" })
        router("/")
      }
    } catch (err) {
      console.log(err)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <div
      id="login"
      className="w-full h-full p-4 flex flex-col justify-center items-center gap-10"
    >
      <div>
        <h1 className="text-5xl font-bold tracking-tighter">Taccuino</h1>
      </div>
      <form
        className="w-full md:w-96 flex flex-col gap-4"
        onChange={(e) => {
          e.preventDefault()
          setUser({ ...user, [e.target.name]: e.target.value })
        }}
      >
        <div>
          <label htmlFor="title">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={user.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={user.password}
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-auto btn btn-primary"
          >
            Login
          </button>
        </div>
        <div>
          <p className="text-center">
            New here?{" "}
            <a href="/signup" className="underline">
              Signup
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
