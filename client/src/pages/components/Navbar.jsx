/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from 'react-redux'
import { useGetAllUsersQuery, useLogoutMutation, useUpdateUrgentMutation } from '../../redux/api/user'
import { Confirmation } from './Confirmation'
import { useEffect, useState } from 'react'
import { logout, removeUser, setUser } from '../../redux/features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Notification } from './Notification'

export const Navbar = () => {
  const {userInfo,token, user} = useSelector((state)=> state.auth)
  const [logoutUser] = useLogoutMutation()
  const dispatch = useDispatch()
  const [logoutModal, setLogoutModal] = useState(false)
  const navigate = useNavigate()
  const [confirmationUrgent, setConfirmationUrgent] = useState(false)
  const [notificationUrgent, setNotificationUrgent] = useState(false)
  const [updateUrgent] = useUpdateUrgentMutation()
  const {data: allUsers , refetch} = useGetAllUsersQuery()
  const urgent = allUsers?.filter((u)=> u.isUrgent === true)
  const user_info = allUsers?.filter((u)=> u._id === userInfo._id)
 
  
  useEffect(()=> {
    dispatch(setUser({...user_info}))
  },[allUsers])

  useEffect(()=> {
    refetch()
    setTimeout(async()=> {
      if(user[0]?.isOnline === false && user[0]?.forcedOffline === true) {
        const res = await logoutUser(userInfo._id)
        if(!res.error) {
          dispatch(logout())
          dispatch(removeUser())
          navigate('/')
        }
      }
    })
  })
  useEffect(()=> {
  },[userInfo, user])
  const handleLogoutModal = () => {
    setLogoutModal(true)
  }

  const handleLogout = async() => {
    const res = await logoutUser(userInfo._id)
    if(!res.error) {
      dispatch(logout())
      navigate('/')
      dispatch(removeUser())
    }
  }
  
  useEffect(()=> {
    if(userInfo === null) {
      navigate('/')
    } 
  },[userInfo])

  const handleConfirmationUrgent = () => {
    setConfirmationUrgent(true)
  } 

  const handleSubmitUrgent = async() => {
    const res = await updateUrgent(token)
    if(!res.error) {
      setConfirmationUrgent(false)
      setNotificationUrgent(true)
      refetch()
    }
  }

  return (
    <>
      <header className='w-full hover:shadow-md shadow-black/40 bg-white '>
        <nav className='flex justify-between items-center'>
          <img src="/images.png" alt="logo" className={`${userInfo.isTv ? "w-28" : "w-48"}`}/>
          <div className='flex gap-5 items-center justify-center font-bold'>
            {
              userInfo.department === "ADMIN" && !userInfo.isTv &&
              <>
                <Link to="/admin-dashboard">Dashboard</Link>
                {
                  userInfo.branch === "MAIN" &&
                  <>
                    <Link to="/accounts">Accounts</Link>
                    <Link to="/branch-dept">Dept & Branch</Link>
                  </>
                }
                <Link to="/urgents" className='relative'>
                  Urgents
                  {
                    urgent?.length ? (
                    <>
                      <i className="bi bi-circle-fill absolute -top-2 text-red-500 -right-2 text-xs"></i>
                      <i className="bi bi-circle-fill absolute -top-2 text-red-500 -right-2 text-xs animate-ping"></i>
                    </>
                    ) : (
                      <div></div>
                    )
                  }
                </Link>
              </>
            }
            {
              userInfo.department !== "ADMIN" &&
              <div>
                {
                  !user[0]?.isUrgent ? (
                    <button className='w-32 border-2 py-2 rounded-md border-red-500 text-white bg-red-500 hover:text-red-500 hover:bg-white duration-200 ease-in-out' onClick={handleConfirmationUrgent}>Urgent</button>
                  ) : (
                    <div className='w-32 border-2 py-2 rounded-md border-red-500 text-red-500 bg-white text-center cursor-default'>
                      Urgent
                    </div>
                  )
                }
              </div>
            }
            <div className='flex gap-2 mr-5 hover:scale-110 items-center cursor-pointer duration-200 ease-in-out' onClick={handleLogoutModal}>
              <i className="bi bi-door-open-fill text-xl"></i>
                <span className='text-md'>Logout</span>
            </div>
          </div>
        </nav>
      </header>
      {
        logoutModal &&
      <Confirmation color="red" yes={handleLogout} no={()=> setLogoutModal(false)}>
        Are you sure you want to logout?
      </Confirmation>
      }
      {
        confirmationUrgent &&
      <Confirmation color="red" yes={handleSubmitUrgent} no={()=> setConfirmationUrgent(false)}>
        Do you have any Urgent ?
      </Confirmation>
      }
      {
        notificationUrgent &&
        <Notification color="bg-red-500" transitions={notificationUrgent} success={()=> setNotificationUrgent(false)}>
          Urgent Successfully Sent to IT
        </Notification>
      }
    </>
  )
}
