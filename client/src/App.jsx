import "./App.css";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { setCurrentUser } from "./actions/authActions";
import { Provider } from "react-redux";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import store from "./store";
//check token and then set the user
if (localStorage.jwtToken) {
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />{" "}
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/register" element={<Register />} />{" "}
        </Routes>{" "}
        <Footer />
      </Router>{" "}
    </Provider>
  );
}

export default App;
