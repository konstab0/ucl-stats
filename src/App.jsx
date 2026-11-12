import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Results from "./pages/Results";
import Standings from "./pages/Standings";
import TopScorers from "./pages/TopScorers";


function App() {
  return (
    // Using HashRouter to support GitHub Pages deployment
    <HashRouter>
      <nav className="navbar bg-dark px-3" data-bs-theme="dark">
        <Link className="navbar-brand" to="/">UCL Stats</Link>
        <div className="d-flex flex-wrap gap-3">
          <Link className="nav-link" to="/results">Results</Link>
          <Link className="nav-link" to="/standings">Standings</Link>
          <Link className="nav-link" to="/top-scorers">Top Scorers</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Results />} />
        <Route path="/results" element={<Results />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/top-scorers" element={<TopScorers />} />
      </Routes>
    </HashRouter>
  )
}
export default App;

