import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import {useState,useEffect} from 'react';
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Problem from "./components/Problems/AddProblem";
import Error from "./components/Error/error";
import About from "./components/About/about";
import ProblemTable from "./components/Problems/ProblemTable";
import ProblemDetail from "./components/Problems/ProblemDetail"
import EditProblemForm from "./components/Problems/EditProblem";

const AppLayout = ({ children }) => {
  return <>{children}</>;
};

function App() {
  const user = localStorage.getItem("token");

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Fetch problems data from the API
    fetch('http://localhost:8080/api/problems')
      .then((response) => response.json())
      .then((data) => {
        setProblems(data.problems);
      })
      .catch((error) => {
        console.error('Error fetching problems:', error);
      });
  }, [user,problems]);

  return (
    // <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <AppLayout>
                <Main />
                <Outlet />
              </AppLayout>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        >
          <Route index element={<ProblemTable />} /> {/* Use "index" for the root path */}
          <Route path="add-problem" element={<Problem />} />
          <Route path="about" element={<About />} />
          {/* <Route path="/problem/:problemNo" element={<ProblemDetail />} /> */}
          {/* <Route path="/problem/:problemNo" element={<ProblemDetail problems={problems} />} /> */}
          <Route
          path="/problem/:problemNo"
          element={<ProblemDetail problems={problems} />}
        />
        <Route
          path="/edit/problem/:problemNo"
          element={<EditProblemForm />}
        />

          {/* To add more child routes here */}
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    // </Router>
  );
}

export default App;
