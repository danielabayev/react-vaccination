import {BrowserRouter, Link, Routes, Route} from "react-router-dom";
import Menu from "./components/Menu";
import NoPage from "./components/NoPage";
import Home from "./components/Home";
import InformationPage from "./components/InformationPage";

function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />}>
              <Route index element={<Home/>} />
              <Route path="home" element={<Home/>} />
              <Route path="informationPage" element={<InformationPage/>}/>
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>

      </div>
  );
}

export default App;
