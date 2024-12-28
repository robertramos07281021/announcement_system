/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLoginMutation, useUpdateIsOnlineItMutation } from "../redux/api/user"
import { setCredentials, setToken, setUser } from "../redux/features/auth/authSlice"
import { useLocation, useNavigate } from "react-router-dom"

export const Login = () => {
  const {userInfo} = useSelector((state)=> state.auth)
  const [data, setData] = useState({
    username: "",
    password: ""
  })
  const navigate = useNavigate()
  const [required, setRequired] = useState(false)
  const dispatch = useDispatch()
  const [login, {isLoading}] = useLoginMutation() 
  const [incorrect, setIncorrect] = useState(false)
  const [already, setAlready] = useState(false)
  const [eye, setEye] = useState(false)
  const {search} = useLocation()
  const [updateItIsOnline] = useUpdateIsOnlineItMutation()

  useEffect(()=> {
    setTimeout(async()=> {
      if(search) {
        const res = await updateItIsOnline(search.substring(10,(search.length + 1)))
        console.log(res)
      }
    })
  },[search])

  const handleSubmit = async(e)=> {
    const form = document.querySelector('form')
    e.preventDefault()
    if(!form.checkValidity()) {
      setRequired(true)
    } else {
      const res = await login(data)
      console.log(res)
      if(!res.error){
        dispatch(setCredentials({...res.data.user}))
        dispatch(setUser({...res.data.user}))
        dispatch(setToken(res.data.token))
      } else {
        if(res.error.data.message === "Incorrect") {
          setIncorrect(true)
          setAlready(false)
        }
        if(res.error.data.message === "Already") {
          setIncorrect(false)
          setAlready(true)
        }
      }
    }
  }

  useEffect(()=> {
    if(userInfo !== null) {
      if(userInfo?.department === "ADMIN" && !userInfo?.isTv) {
        navigate('/admin-dashboard')
      } else if(userInfo?.department === "HR" && !userInfo?.isTv) {
        navigate('/hr-dashboard')
      } else if(userInfo?.department === "OPERATIONS" && !userInfo?.isTv) {
        navigate('/operation-dashboard')
      } else if(userInfo?.department === "QA" && !userInfo?.isTv) {
        navigate('/qa-dashboard')
      } else if(userInfo?.isTv) {
        navigate('/tv-dashboard')
      } else if(userInfo?.department !== "ADMIN" && userInfo?.department !== "HR" && !userInfo?.isTv) {
        navigate('/campaign-dashboard')
      }
    }
  },[userInfo])

  return (
    <div className='h-screen w-full relative flex flex-col overflow-x-hidden bg-no-repeat bg-cover items-center justify-center' style={{backgroundImage: `url(/BGBernLogo.jpg)`}}>
      {
        !isLoading ? (
          <div className="w-5/12 h-5/6 rounded-md shadow-lg shadow-black/70 bg-white flex flex-col items-center justify-center">
            <img src="/images.png" alt="" />
            <form className="w-96 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                <h1 className="text-center font-bold text-2xl text-blue-900">Announcement System</h1>
                <h1 className="text-center font-bold text-2xl text-blue-900">LOGIN</h1>
                {
                  required && 
                  <p className="text-xs font-semibold text-center text-red-500">All fields are required.</p>
                }
                {
                  incorrect && 
                  <p className="text-xs font-semibold text-center text-red-500">Incorrect username or password.</p>
                }
                {
                  already && 
                  <p className="text-xs font-semibold text-center text-red-500">Account is already logged in.</p>
                }
                <label>
                  <span className="text-blue-900 font-bold">Username :</span>
                  <input type="text" value={data.username} onChange={(e)=> setData({...data, username: e.target.value})} className="w-full border-2 border-blue-900 p-2 rounded" placeholder="Enter Username" required/>
                </label>
                <label className="relative">
                  <span className="text-blue-900 font-bold">Password :</span>
                  <input type={`${eye ? "text" : "password"}`} value={data.password} onChange={(e)=> setData({...data, password: e.target.value})} className="w-full border-2 border-blue-900 p-2 rounded" placeholder="Enter Password" required/>
                  <i className={`bi bi-eye-fill absolute top-8 right-3  text-xl ${eye && "hidden"} `} onClick={()=> setEye(true)}></i>
                  <i className={`bi bi-eye-slash-fill absolute top-8 right-3 text-xl ${!eye && "hidden"} `} onClick={()=> setEye(false)}></i>
                </label>
                <div className="flex justify-center mt-4">
                  <button className="w-40 py-3 font-bold text-xl text-white bg-blue-900 rounded border-2 border-blue-900 hover:bg-white hover:text-blue-900 duration-200 ">
                    Submit
                  </button>
                </div>
            </form>
          </div>
        ) : (
          <div className="border-8 border-dotted w-16 h-16 rounded-full animate-spin"></div>
        )
      }

    </div>
  )
}
