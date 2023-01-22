import './App.css';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage';
import LoginPage from './Components/LoginPage/LoginPage';
import SignupPage from './Components/SignupPage/SignupPage';
import Footer from './Components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/signup" element={<SignupPage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;