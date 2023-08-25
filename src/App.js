import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { GlobalProvider } from './context/GlobalContext';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from './pages/home';
import Basket from './pages/basket';
import Profile from './pages/profile';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" exact component={Home} element={<Home/>}  />
          <Route path="/basket" component={Basket} element={<Basket/>}/>
          <Route path="/profile" component={Profile} element={<Profile/>}/>
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
