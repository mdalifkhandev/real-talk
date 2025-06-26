import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStor"


function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const {theme}=useThemeStore() as {theme:string}

  useEffect(()=>{
    checkAuth()
  },[])


  // if(isCheckingAuth && !authUser) {
  //   return(
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className='size-10 animate-spin' />

  //     </div>
  //   )
  // }


  return (
   <div data-theme={theme}>
    <Navbar/>

<Routes>
      <Route path="/" element={authUser? <Home />:<Navigate to="/login"/>} />
      <Route path="/signup" element={!authUser?<SignUp />:<Navigate to="/login"/>} />
      <Route path="/login" element={!authUser?<Login />:<Navigate to="/"/>} />
      <Route path="/settings" element={authUser?<Settings />:<Navigate to="/login"/>} />
      <Route path="/profile" element={authUser? <Profile />:<Navigate to="/login"/>} />
</Routes>
<Toaster/>
   </div>
  )
}

export default App
