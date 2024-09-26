// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import PassengerDashboard from './pages/PassengerDashboard';
import DriverDashboard from './pages/DriverDashboard';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister />} />
        <Route path="/passenger" element={<PassengerDashboard />} />
        <Route path="/driver" element={<DriverDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

