// import { Route,Routes} from "react-router-dom"
// import HomePage from "./home/HomePage.jsx"
// import LoginPage from "./pages/loginPage.jsx"
// import SignupPage from "./pages/signupPage.jsx"
// import { Toaster } from "react-hot-toast"
// import Sidebar from "./components/common/Sidebar.jsx"
// import RightPanel from "./components/common/RightPanel.jsx"
// import NotificationPage from "./pages/notification/NotificationPage.jsx"
// import ProfilePage from "./pages/profile/ProfilePage.jsx"
// function App() {
//   return (
//     <div className="flex max-w-6xl mx-auto">
//       <Sidebar />
//       <Routes>
//         <Route path="/" element={<HomePage/>}/>
//         <Route path="/login" element={<LoginPage/>}/>
//         <Route path="/signup" element={<SignupPage/>}/> 
//         <Route path="/notifications" element={<NotificationPage />}/>
//         <Route path="/profile/:username" element={ <ProfilePage /> }/>
//       </Routes>
//       <RightPanel />
//       <Toaster />
//     </div>
//   )
// }

// export default App



import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./home/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RightPanel from "./components/common/RightPanel.jsx";
import NotificationPage from "./pages/notification/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";

import useAuthStore from "./store/auth.store.js";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);


  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      {authUser && <Sidebar />}
      <Routes>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      {authUser && <RightPanel />}
      <Toaster />
    </div>
  );
}

export default App;