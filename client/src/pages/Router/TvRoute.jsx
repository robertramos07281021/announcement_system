
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"

export const TvRoute = () => {
  const {userInfo} = useSelector((state)=> state.auth)
  return userInfo?.isTv ? (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-no-repeat bg-cover relative" style={{backgroundImage: `url(/BGBernLogo.jpg)`}}>
    <Navbar/>
    <Outlet/>
  </div>
  ) : (
    <Navigate to="/"/>
  )
}
