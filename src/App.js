import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import Login from "./Login";
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { NoteProvider, useNote } from "./Contexts/NoteContext";
import Hero from "./Hero";

function Form() {
  const { handleAddNote, isEdit, selectedNote, handleEditNote } = useNote();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setNote(selectedNote.note);
    }
  }, [isEdit, selectedNote]);

  function submitHandler(e) {
    e.preventDefault();

    if (!isEdit) handleAddNote({ title, note, id: new Date().getTime() });
    if (isEdit) handleEditNote({ ...selectedNote, title, note });
    setTitle("");
    setNote("");
  }
  return (
    <div className="center">
      <form className="form" action="" onSubmit={submitHandler}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />

        <textarea
          name=""
          id=""
          placeholder="Take a note ..."
          cols="50"
          rows="3"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>

        <button type="submit" className="btn btn-add">
          {isEdit ? "Edit Note" : "Add Note"}
        </button>
      </form>
    </div>
  );
}
function CreateNote() {
  return <Form />;
}

function App() {
  return (
    <div className="App Container">
      <AuthProvider>
        <Routes>
          <Route index element={<Hero />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <NoteProvider>
                  <Home />
                </NoteProvider>
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
function Home() {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* <User /> */}
      <Navigation search={search} setSearch={setSearch} />
      <CreateNote />

      <NoteList search={search} />

      {/* <Theme /> */}
    </>
  );
}

function NoteList({ search }) {
  const { notes, isSearched } = useNote();
  const searchedNotes = isSearched
    ? [...notes].filter(
        (note) => note.title.includes(search) || note.note.includes(search)
      )
    : notes;

  return (
    <>
      <div className="notes">
        {searchedNotes.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
    </>
  );
}

function Note({ note }) {
  const { handleDeleteNote, dispatch } = useNote();

  return (
    <>
      <div
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          dispatch({ type: "note/selectNote", payload: note.id });
        }}
        className="note"
      >
        <div className="note-header flex">
          <p>{note.title}</p>
          <button onClick={() => handleDeleteNote(note.id)} className="delete">
            &#9587;
          </button>
        </div>
        <p className="note-description">{note.note}</p>
        <div className="flex">{/* <p className="date">{note.date}</p> */}</div>
      </div>
    </>
  );
}

export default App;

// function Theme() {
//   return (
//     <div className="themes">
//       <div className="theme red"></div>
//       <div className="theme yellow"></div>
//       <div className="theme blue"></div>
//       <div className="theme green"></div>
//       <div className="theme pink"></div>
//     </div>
//   );
// }
