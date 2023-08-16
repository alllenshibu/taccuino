import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { useCookies } from "react-cookie"
import axios from "axios"

import Layout from "../layouts/Layout"
import Explorer from "../components/Explorer"
import Editor from "../components/Editor"
import Previewer from "../components/Previewer"

function Dasboard() {
  const params = useParams()
  const navigate = useNavigate()

  const [cookies, setCookie] = useCookies(["token"])
  const [noteId, setNoteId] = useState(params.id)
  const [markdown, setMarkdown] = useState("")

  const saveProgress = async () => {
    const title = markdown.split("\n")[0].replace("# ", "")
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/notes/" + params.id,
        {
          note: {
            content: markdown,
            title: title || "Untitled",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            type: "application/json",
          },
        }
      )
      console.log(response)
      if (response.status === 200) {
        // setMarkdown(response.data?.content)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const createNewNote = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/notes",
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            type: "application/json",
          },
        }
      )
      console.log(response)
      if (response.status === 200) {
        setMarkdown(response.data?.content)
        navigate("/notes/" + response.data?._id)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchNote = async (id) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/notes/" + params.id,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            type: "application/json",
          },
        }
      )
      console.log(response)
      if (response.status === 200) {
        setMarkdown(response.data?.content)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(params)
    saveProgress()
    fetchNote(params.id)
  }, [params])

  useEffect(() => {
    if (
      cookies.token === undefined ||
      cookies.token === null ||
      cookies.token === ""
    ) {
      navigate("/login")
    }
    
    let interval
    interval = setInterval(() => {
      saveProgress()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>
      <Explorer createNewNote={createNewNote} saveProgress={saveProgress} />
      <Editor markdown={markdown} setMarkdown={setMarkdown} />
      <Previewer markdown={markdown} />
    </Layout>
  )
}

export default Dasboard
