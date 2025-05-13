import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WordList from "./pages/WordList";
import AddWord from "./pages/AddWord";
import EditWord from "./pages/EditWord";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WordList />} />
        <Route path="/add-word" element={<AddWord />} />
        <Route path="/edit-word/:category/:word" element={<EditWord />} />
      </Routes>
    </Router>
  );
}

export default App;
