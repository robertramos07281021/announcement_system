/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

export const Notification = ({children, color, transitions, success}) => {

  const [transition, setTransition] = useState('translate-x-full')
  
  useEffect(()=> {
    if(transitions) {
      setTimeout(()=> {
        setTransition("-translate-x-0")
      },200)
    } 

    setTimeout(()=> {
      setTransition("translate-x-full")
      setTimeout(()=> {
        success()
      },200)
    },3000)

  },[transitions])


  return (
    <div className={`absolute w-96 h-12 right-2 top-20 rounded shadow-md shadow-black/50 flex items-center px-5 ${color} ${transition} text-white font-bold tracking-wider duration-300 transition-all z-50`}>{children}</div>
  )
}






