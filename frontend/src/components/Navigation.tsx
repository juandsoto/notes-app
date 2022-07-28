import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import AddNote from "../pages/AddNote";
import ArchivedNotes from "../pages/ArchivedNotes";
import Categories from "../pages/Categories";
import EditNote from "../pages/EditNote";
import Login from "../pages/Login";
import Notes from "../pages/Notes";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";
import { useAuth } from "../context/auth/index";

const Protected = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { user } = useAuth();

  if (!user.token.length) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route
          path="notes"
          element={
            <Protected>
              <App />
            </Protected>
          }
        >
          <Route index element={<Notes />} />
          <Route path="add" element={<AddNote />} />
          <Route path="edit/:id" element={<EditNote />} />
        </Route>
        <Route
          path="/categories"
          element={
            <Protected>
              <App />
            </Protected>
          }
        >
          <Route index element={<Categories />} />
        </Route>
        <Route
          path="/archived"
          element={
            <Protected>
              <App />
            </Protected>
          }
        >
          <Route index element={<ArchivedNotes />} />
        </Route>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
