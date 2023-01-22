import './App.css';
import Navbar from './Components/Navbar/Navbar';
import AboutPage from './Components/AboutPage/AboutPage';
import SearchPicturesPage from './Components/SearchPicturesPage/SearchPicturesPage';
import MyPicturesPage from './Components/MyPicturesPage/MyPicturesPage';
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
          <Route exact path="/about" element={<AboutPage />}></Route>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/signup" element={<SignupPage />}></Route>
          <Route exact path="/my-pictures" element={<MyPicturesPage />}></Route>
          <Route exact path="/search-pictures" element={<SearchPicturesPage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;