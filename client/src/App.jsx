import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPanel from "./components/loginpanel/LoginPanel";
import DashboardPanel from "./components/dashboardpanel/DashboardPanel";

const App = () => {
  const [isLogin, setLogin] = useState(false);
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Login route */}
          <Route
            path="/login"
            element={
              isLogin ? (
                <Navigate to="/dashboard" />
              ) : (
                <LoginPanel isLogin={() => setLogin(!isLogin) }/>
              )
            }
          />
          
          <Route
            path="/dashboard"
            element={ <DashboardPanel /> }
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
