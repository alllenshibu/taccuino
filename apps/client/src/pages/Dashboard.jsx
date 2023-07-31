import React, { useState } from "react"

import Layout from "../layouts/Layout"
import Explorer from "../components/Explorer"
import Editor from "../components/Editor"
import Previewer from "../components/Previewer"

function Dasboard() {
  const [markdown, setMarkdown] = useState("")

  return (
    <Layout>
      <button className="btn">Save</button>
      <Explorer />
      <Editor setMarkdown={setMarkdown} />
      <Previewer markdown={markdown} />
    </Layout>
  )
}

export default Dasboard
