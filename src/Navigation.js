import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

import { useNote } from "./Contexts/NoteContext";
export default function Header({ search, setSearch, searchHandler }) {
  const { state, logout } = useAuth();
  const { isAuthenticated } = state;
  const navigate = useNavigate();
  return (
    <div className="header">
      <div>Note Mania</div>
      <Search
        search={search}
        setSearch={setSearch}
        searchHandler={searchHandler}
      />
      <ul className="navigation-list">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          {!isAuthenticated ? (
            <NavLink className="btn" to="/login">
              Login
            </NavLink>
          ) : (
            <button
              className="btn"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

function Search({ search, setSearch }) {
  // const [search, setSearch] = useState("");
  // const [isSearched, setIsSearch] = useState(false);
  const { isSearched, dispatch } = useNote();

  function changeHandler(e) {
    setSearch(e.target.value);
  }
  function searchHandler() {
    if (!isSearched) dispatch({ type: "note/searchNote", payload: true });
    if (isSearched) {
      setSearch("");
      dispatch({ type: "note/searchNote", payload: false });
    }
  }
  console.log(isSearched, "h hum");
  return (
    <>
      <div className="search-box">
        <input
          value={search}
          onChange={changeHandler}
          className="search"
          placeholder={"Search Notes..."}
          type="text"
          name=""
          id="Search"
        />
        <button onClick={searchHandler} className=" btn-close">
          {isSearched ? (
            <>&times;</>
          ) : (
            <ion-icon name="search-outline"></ion-icon>
          )}
        </button>
      </div>
    </>
  );
}
