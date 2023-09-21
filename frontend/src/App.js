import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Problem from "./components/Problems/problemList";
import Error from "./components/Error/error";
import About from "./components/About/about";
import ProblemTable from "./components/Problems/ProblemTable";


const AppLayout = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
}

function App() {
  const user = localStorage.getItem("token");

  return (
    // <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <AppLayout>
                <Main /> {/* Render Main component here to make it common */}
                <Outlet />
              </AppLayout>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        >
          {/* <Route index element={<Main />} /> This created two Main */}
          <Route path="add-problem" element={<Problem />} />
          <Route path="about" element={<About />} />
          <Route path="problem-table" element={<ProblemTable />} />
          {/* To add more child  routes here */}
          
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />

        
      </Routes>
    // </Router>
  );
}



export default App;
