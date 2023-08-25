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

  const [previewer, setPreviewer] = useState(true)
  const [cookies, setCookie] = useCookies(["token"])
  const [noteId, setNoteId] = useState(params.id)
  const [markdown, setMarkdown] = useState("")

  const saveProgress = async () => {
    const title = markdown.split("\n")[0].replace("# ", "")
    console.log({ noteId })
    try {
      localStorage.setItem(params.id, markdown)
      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/notes/" + noteId,
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
      fetchAllNotesSkeleton()
      if (response.status === 200) {
        // setMarkdown(response.data?.content)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // exfdadasf

  const [allNotesSkelton, setAllNotesSkelton] = useState([])

  const handleNoteClick = (noteId) => {
    console.log({ noteId, paramsId: params.id, markdown })
    saveProgress().then(() => {
      navigate("/notes/" + noteId)
    })
  }

  const fetchAllNotesSkeleton = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/notesskeleton/",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            type: "application/json",
          },
        }
      )
      if (response.status === 200) {
        setAllNotesSkelton(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAllNotesSkeleton()
    setNoteId(params.id)
  }, [params])

  // dfdasf dsafdas

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
      if (response.status === 200) {
        setMarkdown(response.data?.content)
        setNoteId(response.data?._id).then(() => {
          navigate("/notes/" + response.data?._id)
        })
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
    setMarkdown("")
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
      <div className="w-96 h-full p-2 bg-neutral-800 text-neutral-400">
        <div className="pb-4 flex justify-between items-center text-xl text-neutral-200 font-bold tracking-wide">
          <p>Taccuino</p>
          <button className="pr-2" onClick={createNewNote}>
            +
          </button>
        </div>
        <ul className="flex flex-col justify-start items-start gap-2 overflow-y-auto">
          {allNotesSkelton &&
            allNotesSkelton.map((note) => (
              <li
                onClick={(e) => {
                  handleNoteClick(note.id)
                }}
                key={note.id}
              >
                {note.title}
              </li>
            ))}

          {allNotesSkelton && allNotesSkelton.length === 0 && (
            <p className="text-neutral-400">No notes found</p>
          )}
        </ul>
      </div>
      <Editor markdown={markdown} setMarkdown={setMarkdown} />
      {previewer && <Previewer markdown={markdown} />}
      <div className="absolute right-20 bottom-20 flex gap-4">
        <button
          className="bg-neutral-800 text-neutral-200 py-1 px-4 rounded"
          onClick={() => {
            setPreviewer(!previewer)
          }}
        >
          Preview
        </button>
        <button
          className="bg-neutral-800 text-neutral-200 py-1 px-4 rounded"
          onClick={saveProgress}
        >
          Save
        </button>
      </div>
    </Layout>
  )
}

export default Dasboard
