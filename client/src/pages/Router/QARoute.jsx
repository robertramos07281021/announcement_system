import { useSelector } from 'react-redux'
import { Navigate, Outlet,  } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const QARoute = () => {
  const {userInfo} = useSelector((state)=> state.auth)
  return userInfo.department === "QA" && !userInfo.isTv ? (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-no-repeat bg-cover relative" style={{backgroundImage: `url(/BGBernLogo.jpg)`}}>
      <Navbar/>
      <Outlet/>
    </div>
  ) : (
    <Navigate to="/"/>
  )
}
