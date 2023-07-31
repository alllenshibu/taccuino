import React from "react"

function Editor({ onMarkdownChange, markdown }) {
  return (
    <div id="editor" className="w-full h-full">
      <textarea
        className="resize-none w-full h-full"
        value={markdown}
        onChange={(e) => {
          onMarkdownChange(e.target.value)
        }}
      ></textarea>
    </div>
  )
}

export default Editor
