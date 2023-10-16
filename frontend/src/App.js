import { Route, Routes,Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Problem from "./components/Problems/AddProblem";
import Error from "./components/Error/error";
import About from "./components/About/about";
import ProblemTable from "./components/Problems/ProblemTable";
import ProblemDetail from "./components/Problems/ProblemDetail";
import EditProblemForm from "./components/Problems/EditProblem";
import MainContent from "./components/MainContent/mainContent";

const AppLayout = ({ children }) => {
  return <>{children}</>;
};

function App() {
 

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <MainContent />
           
            <Outlet />
          </AppLayout>
        }
      >
        <Route path="problem-table" element={<ProblemTable />} />
        <Route path="/" element={<Main />} />
        <Route
          path="add-problem"
          element={ <Problem />}
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<About />} />
        <Route path="problem/:problemNo" element={<ProblemDetail />} />
        <Route
          path="edit/problem/:problemNo"
          element={<EditProblemForm /> }
        />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
