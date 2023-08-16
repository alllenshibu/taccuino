import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useCookies } from "react-cookie"
import axios from "axios"

function Explorer({ createNewNote, saveProgress }) {
  const navigate = useNavigate()
  const params = useParams()

  const [cookies, setCookie] = useCookies(["token"])
  const [allNotesSkelton, setAllNotesSkelton] = useState([])

  const handleNoteClick = async (noteId) => {
    console.log(noteId)
    await saveProgress()
    navigate("/notes/" + noteId)
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
      console.log(response)
      if (response.status === 200) {
        setAllNotesSkelton(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAllNotesSkeleton()
  }, [params])

  return (
    <div className="w-96 h-full p-2 bg-neutral-800 text-neutral-400">
      <div className="pb-4 flex justify-between items-center text-xl text-neutral-200 font-bold tracking-wide">
        <p>Taccuino</p>
        <button className="pr-2" onClick={createNewNote}>
          +
        </button>
        <button className="pr-2" onClick={saveProgress}>
          #
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
  )
}

export default Explorer
