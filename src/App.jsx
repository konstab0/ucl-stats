import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Results from "./pages/Results";
import Standings from "./pages/Standings";
import TopScorers from "./pages/TopScorers";


function App() {
  return (
    <BrowserRouter>
      <h1>UCL Stats</h1>
      <nav>
        <Link to="/results">Results</Link> |{" "}
        <Link to="/standings">Standings</Link> |{" "}
        <Link to="/top-scorers">Top Scorers</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Results />} />
        <Route path="/results" element={<Results />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/top-scorers" element={<TopScorers />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
  
