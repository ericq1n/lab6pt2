import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import EmployeeMngmt from "./components/EmployeeMngmt";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NameProvider } from "./context/NameContex";

function App() {

  return (
    <NameProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Section/>}/>
          <Route path="/employeemngmt" element={<EmployeeMngmt/>}/>
        </Routes>
        <Footer/>
      </Router>
    </NameProvider>
  )
}

export default App