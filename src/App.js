import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Login";
// import required react-datepicker styling file
import "react-datepicker/dist/react-datepicker.css";
import { Navbar, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Records } from "./records";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { GetToken } from "./GetToken";
function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="App" id="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand
              onClick={() => {
                if (localStorage.getItem("token")) {
                  localStorage.removeItem("token");
                }
                navigate("/");
              }}
            >
              {/* <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "} */}
              Expense Tracker
            </Navbar.Brand>
          </Container>
        </Navbar>
        <marquee
          style={{ background: "black", color: "white", fontSize: "1em" }}
        >
          Contact sindgishantesh@gmail.com to use this site
        </marquee>
      </div>

      <Routes>
        <Route path="/" element={
        !GetToken()?<Login />:<Dashboard/>
        }>
        </Route>

        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="records"
          element={
            <PrivateRoute>
              <Records />
            </PrivateRoute>
          }
          exact
        />
      </Routes>
    </>
  );
}

export default App;
