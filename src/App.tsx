import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WordList from "./pages/WordList";
import AddWord from "./pages/AddWord";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WordList />} />
        <Route path="/add-word" element={<AddWord />} />
      </Routes>
    </Router>
  );
}

export default App;
