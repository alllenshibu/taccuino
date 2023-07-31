import React from "react"

function Editor({ markdown, setMarkdown }) {
  return (
    <div id="editor" className="w-full h-full">
      <textarea
        className="resize-none w-full h-full font-mono"
        value={markdown}
        onChange={(e) => {
          setMarkdown(e.target.value)
        }}
      ></textarea>
    </div>
  )
}

export default Editor
