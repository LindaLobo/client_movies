import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grilla from "./componentes/Grilla";
import Header from "./componentes/Header";
import { OptionContextProvider } from "./context/OptionContext";
import Detail from "./componentes/Detail";
import SingUp from "./componentes/SingUp";
import Login from "./componentes/Login";
import { AuthProvider } from "./context/AuthProvider";
import Favorites from "./componentes/Favorites";
import Trending from "./componentes/Trending";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <OptionContextProvider>
            <div className="App">
              <Header />
              <Routes>
                <Route path="/" element={<Grilla />}></Route>
                <Route path="/movie/:id" element={<Detail />}></Route>
                <Route path="/signup" element={<SingUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/favorites" element={<Favorites />}></Route>
                <Route path="/trending" element={<Trending />}></Route>
              </Routes>
            </div>
          </OptionContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
