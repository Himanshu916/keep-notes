import { createContext, useContext, useReducer } from "react";
const initialNotes = [
  {
    id: 1,
    user: "Himanshu",
    title: "note1",
    note: ` Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, hic
      tenetur distinctio pariatur fuga natus laboriosam neque est molestiae
      commodi nihil accusantium enim rerum saepe tempore fugit sit
      laudantium non?Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Quidem itaque harum, optio magnam animi dolorum possimus id
      minus magni laboriosam ea eaque provident aut velit quos. Sed ab quam
      nam!Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Magnam sequi consectetur illum minima ipsum hic dignissimos
      laudantium, repudiandae blanditiis libero facere quasi ea recusandae
      cumque vel eligendi, delectus similique molestias?`,
    date: "now",
  },
  {
    id: 2,
    user: "Himanshu",
    title: "note2",
    note: ` Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, hic
      tenetur distinctio pariatur fuga natus laboriosam neque est molestiae
      commodi nihil accusantium enim rerum saepe tempore fugit sit
      laudantium non?Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Quidem itaque harum, optio magnam animi dolorum possimus id
      minus magni laboriosam ea eaque provident aut velit quos. Sed ab quam
      nam!Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Magnam sequi consectetur illum minima ipsum hic dignissimos
      laudantium, repudiandae blanditiis libero facere quasi ea recusandae
      cumque vel eligendi, delectus similique molestias?`,
    date: "now",
  },
  {
    id: 3,
    user: "Himanshu",
    title: "note3",
    note: ` Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, hic
      tenetur distinctio pariatur fuga natus laboriosam neque est molestiae
      commodi nihil accusantium enim rerum saepe tempore fugit sit
      laudantium non?Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Quidem itaque harum, optio magnam animi dolorum possimus id
      minus magni laboriosam ea eaque provident aut velit quos. Sed ab quam
      nam!Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Magnam sequi consectetur illum minima ipsum hic dignissimos
      laudantium, repudiandae blanditiis libero facere quasi ea recusandae
      cumque vel eligendi, delectus similique molestias?`,
    date: "now",
  },
  {
    id: 4,
    user: "Himanshu",
    title: "note4",
    note: ` Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, hic
      tenetur distinctio pariatu`,
    date: "now",
  },
];
const initialState = {
  notes: initialNotes,
  isEdit: false,
  selectedNote: null,
  isSearched: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "note/addNote":
      return { ...state, notes: [...state.notes, action.payload] };

    case "note/deleteNote":
      const notesAfterDeleted = state.notes.filter(
        (note) => note.id !== action.payload
      );
      return { ...state, notes: notesAfterDeleted };

    case "note/editNote":
      const editedNotes = state.notes.map((note) => {
        if (note.id === action.payload.id) return action.payload;
        return note;
      });
      return {
        ...state,
        notes: editedNotes,
        isEdit: false,
        selectedNote: null,
      };
    case "note/searchNote":
      return { ...state, isSearched: action.payload };

    case "note/selectNote":
      console.log(action.payload);
      const selectedNote = state.notes.find((note) => {
        console.log(note.id, action.payload);
        return note.id === action.payload;
      });

      return {
        ...state,
        isEdit: true,
        selectedNote,
      };
    default:
      throw new Error("wrong Action");
  }
}

const NoteContext = createContext();

function NoteProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { notes, isEdit, selectedNote, isSearched } = state;

  function handleDeleteNote(id) {
    dispatch({ type: "note/deleteNote", payload: id });
  }

  function handleAddNote(note) {
    dispatch({ type: "note/addNote", payload: note });
  }

  function handleEditNote(edited) {
    dispatch({ type: "note/editNote", payload: edited });
  }
  return (
    <NoteContext.Provider
      value={{
        notes,
        handleDeleteNote,
        handleAddNote,
        dispatch,
        handleEditNote,
        isEdit,
        selectedNote,
        isSearched,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

const useNote = function () {
  return useContext(NoteContext);
};

export { NoteProvider, useNote };
