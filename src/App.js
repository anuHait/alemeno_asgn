import {Routes, Route} from "react-router-dom";
import './App.css';
import CourseListing from "./pages/CourseListing";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./components/CourseDetails";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<CourseListing />} />
      <Route path="/:id" element={<CourseDetails/>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  );
}

export default App;
