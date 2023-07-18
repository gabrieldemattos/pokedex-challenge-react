//css router-dom
import { BrowserRouter, Route, Routes } from "react-router-dom";

//react redux
import { useSelector } from "react-redux";
import { RootState } from "./redux/root-reducer";

//components
import Home from "./pages/Home/Home";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Search from "./components/Search";
import Pokemon from "./pages/Pokemon/Pokemon";
import MyPokedex from "./pages/Pokedex/MyPokedex";

function App() {
  const { query } = useSelector(
    (rootReducer: RootState) => rootReducer.searchReducer
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <Header />
                <Navbar />
                <Search query={query} />
              </>
            }
          />
          <Route path="/pokemon/:name" element={<Pokemon />} />
          <Route
            path="/my-pokedex"
            element={
              <>
                <Header />
                <MyPokedex />
              </>
            }
          />
          <Route
            path="/pokemon/type/:type"
            element={
              <>
                <Header />
                <Navbar />
                <Search query={query} />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
