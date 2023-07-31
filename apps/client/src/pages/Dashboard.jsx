import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { useCookies } from "react-cookie"
import axios from "axios"

import Layout from "../layouts/Layout"
import Explorer from "../components/Explorer"
import Editor from "../components/Editor"
import Previewer from "../components/Previewer"

function Dasboard() {
  const params = useParams()

  const [cookies, setCookie] = useCookies(["token"])
  const [noteId, setNoteId] = useState(params.id)
  const [markdown, setMarkdown] = useState("")

  const saveProgress = async () => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/notes/" + params.id,
        {
          note: {
            content: markdown,
            title: "test",
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
    fetchNote(params.id)
  }, [params])

  return (
    <Layout>
      <button onClick={saveProgress} className="btn">
        Save
      </button>
      <Explorer />
      <Editor markdown={markdown} setMarkdown={setMarkdown} />
      <Previewer markdown={markdown} />
    </Layout>
  )
}

export default Dasboard
