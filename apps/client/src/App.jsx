import React, { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import { useCookies } from "react-cookie"

import Layout from "./layouts/Layout"
import Explorer from "./components/Explorer"
import Editor from "./components/Editor"
import Previewer from "./components/Previewer"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [markdown, setMarkdown] = useState("")

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route path="/login" component={Login} />

        <Route path="/signup" component={Signup} />

        <Redirect to="/" />
      </Switch>
    </Router>
    // <Layout>
    //   <Explorer />
    //   <Editor onMarkdownChange={setMarkdown} markdown={markdown} />
    //   <Previewer markdown={markdown} />
    // </Layout>
  )
}

export default App
