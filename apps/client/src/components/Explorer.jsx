const allNotesSkelton = [
  {
    id: 1,
    title: "Note 1",
  },
  {
    id: 2,
    title: "Note 2",
  },
  {
    id: 3,
    title: "Note 3",
  },
]

function Explorer({}) {
  return (
    <div className="w-96 h-full p-2 bg-neutral-800 text-neutral-400">
      <div className="pb-4 flex justify-start items-center text-xl text-neutral-200 font-bold tracking-wide">
        <p>Taccuino</p>
      </div>
      <ul className="flex flex-col justify-center items-start gap-2">
        {allNotesSkelton.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Explorer
