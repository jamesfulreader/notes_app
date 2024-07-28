import { useState, useEffect } from "react"
import api from '../api'
import Note from '../components/Note'
import "../styles/Home.css"

function Home() {
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    getNotes()
  }, [] )

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/")
      const data = res.data
      if(!data) {
        setNotes([])
      }
      setNotes(data)
    } catch (error) {
      console.log(error.message)
    }

  }

  const deleteNote = async (id) => {
    try {
    const res = await api.delete(`/api/notes/delete/${id}/`)
    if (res.status === 204) alert("Note Deleted")
    getNotes()
    } catch (error) {
      console.log(error.message)
    }
  }

  const createNote = async (e) => {
    e.preventDefault()
    try {
      const newNote = {content, title}
      const res = await api.post("/api/notes/", newNote)
      if (res.status === 201) alert("Note Created")
      setTitle("")
      setContent("")
      getNotes()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {
          notes.length <= 0 ? 
            <p>No Notes Yet</p>
          :
          notes.map((note) => (
            <Note note={note} onDelete={deleteNote} key={note.id} />
          ))
        }
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea name="content" id="content" required value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Home