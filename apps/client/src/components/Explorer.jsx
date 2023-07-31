import React, { useEffect, useState } from "react"

import { useCookies } from "react-cookie"
import axios from "axios"

function Explorer({}) {
  const [cookies, setCookie] = useCookies(["token"])

  const [allNotesSkelton, setAllNotesSkelton] = useState([])

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
  }, [])

  return (
    <div className="w-96 h-full p-2 bg-neutral-800 text-neutral-400">
      <div className="pb-4 flex justify-start items-center text-xl text-neutral-200 font-bold tracking-wide">
        <p>Taccuino</p>
      </div>
      <ul className="flex flex-col justify-center items-start gap-2">
        {allNotesSkelton &&
          allNotesSkelton.map((note) => <li key={note.id}>{note.title}</li>)}
      </ul>
    </div>
  )
}

export default Explorer
