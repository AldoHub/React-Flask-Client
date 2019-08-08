import React from 'react';
import Routes from "./routes";
import {Link} from "react-router-dom";


function App() {
  return (
    <div className="App">
       <nav>
        <ul>
          <li><Link to="/"> ReactFlask </Link></li>
        </ul>
        <ul>
          <li><Link to="/create">new post</Link></li>
        </ul>
      </nav>
      <main>
        <Routes />
      </main>
    </div>
  );
}

export default App;
