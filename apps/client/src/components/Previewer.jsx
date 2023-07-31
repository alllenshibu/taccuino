import React from "react"

import ReactMarkdown from "react-markdown"

function Previewer({ markdown }) {
  return (
    <div id="preview" className="h-full w-full">
      <ReactMarkdown children={markdown}></ReactMarkdown>
    </div>
  )
}

export default Previewer
