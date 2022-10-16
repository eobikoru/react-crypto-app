import "./App.css";
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
import Alert from "./components/Alert";





function App() {




  return (
    <BrowserRouter>
      <div className="main-style" >
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Coinpage/>} />
        </Routes>
      </div>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
