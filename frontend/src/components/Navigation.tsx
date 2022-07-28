import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import AddNote from "../pages/AddNote";
import ArchivedNotes from "../pages/ArchivedNotes";
import Categories from "../pages/Categories";
import Login from "../pages/Login";
import Notes from "../pages/Notes";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="notes" element={<App />}>
          <Route index element={<Notes />} />
          <Route path="add" element={<AddNote />} />
        </Route>
        <Route path="/categories" element={<App />}>
          <Route index element={<Categories />} />
        </Route>
        <Route path="/archived" element={<App />}>
          <Route index element={<ArchivedNotes />} />
        </Route>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
