// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Code from "./pages/Home/CategoryPage/dsa/Code";
import Contest from "./pages/Home/CategoryPage/Contest";
import Profile from "./pages/Home/Profile";
import Register from "./pages/Home/Register";
import Result from "./pages/Home/Result";
import Sheet from "./pages/Home/Sheet";
import FrontendDevelopment from "./pages/Home/CategoryPage/FrontendDevelopment";
import BackendDevelopment from "./pages/Home/CategoryPage/BackendDevloment";
import DSAChallenge from "./pages/Home/CategoryPage/DSAChallenge";
import FullstackDevelopment from "./pages/Home/CategoryPage/FullstackDevelopment";
import MobileDevelopment from "./pages/Home/CategoryPage/MobileDevelopment ";
import ContestRulesPage from "./pages/Home/CategoryPage/dsa/ContestRulesPage ";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code" element={<Code />} />
        <Route path="/contest/:id" element={<Contest />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/result" element={<Result />} />
        <Route path="/sheet" element={<Sheet />} />
        <Route path="/contest/dsa" element={<DSAChallenge />} />
        <Route path="/contest/frontend" element={<FrontendDevelopment />} />
        <Route path="/contest/backenddev" element={<BackendDevelopment />} />
        <Route
          path="/contest/fullstackdev"
          element={<FullstackDevelopment />}
        />
        <Route path="/contest/mobiledev" element={<MobileDevelopment />} />
        <Route path='/contest/dsa/contestrules' element={<ContestRulesPage/>}/>
      </Routes>
    </div>
  );
};
export default App;
