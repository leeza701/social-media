import { Route,Routes} from "react-router-dom"
import HomePage from "./home/HomePage.jsx"
import LoginPage from "./pages/loginPage.jsx"
import SignupPage from "./pages/signupPage.jsx"
import { Toaster } from "react-hot-toast"
import Sidebar from "./components/common/Sidebar.jsx"
import RightPanel from "./components/common/RightPanel.jsx"
import NotificationPage from "./pages/notification/NotificationPage.jsx"
function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/> 
        <Route path="/notifications" element={<NotificationPage />}/>
      </Routes>
      <RightPanel />
      <Toaster />
    </div>
  )
}

export default App
