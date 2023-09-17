import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Problem from "./components/Problems/problemList";
import Error from "./components/Error/error"

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" exact element={<Main />} />
          <Route path="/add-problem" exact element={<Problem />} />
        </>
      ) : (
        <Route path="/" element={<Navigate replace to="/login" />} />
      )}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="*" element={<Error />} /> //Wrong route
    </Routes>
  );
}

export default App;
