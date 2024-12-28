/* eslint-disable react/prop-types */

export const Confirmation = ({color, yes, no, children}) => {
  return (
    <div className='absolute w-full h-full bg-white/10 backdrop-blur-[1.5px] left-0 top-0 flex items-center justify-center z-50'>
        <div className='w-96 h-72 bg-white flex flex-col overflow-hidden rounded-md shadow-xl shadow-black/50'>
          <h1 className={`p-3 h-16${color === "red" ? " bg-red-500 ":" "}${color === "green" ? "  bg-green-500 ": " "}${color === "orange" ? " bg-orange-500 ":" "}${color === "blue" ? " bg-blue-500 ":" "} text-white font-bold text-2xl`}>Confirmation</h1>
          <div className='border h-full flex items-center justify-center font-semibold text-lg text-center px-20'>
            {children}
          </div>
          <div className='border-t border-black h-36 flex justify-end items-center px-2 gap-3'>
            <button className={`w-32 border-2${color === "red" ? " border-red-500 bg-red-500 hover:text-red-500 " : ""}${color === "green" ? " border-green-500 bg-green-500 hover:text-green-500 " : ""} ${color === "orange" ? " border-orange-500 bg-orange-500 hover:text-orange-500 " : ""} ${color === "blue" ? " border-blue-500 bg-blue-500 hover:text-blue-500 " : ""} hover:bg-white  py-2 font-bold text-white text-lg duration-200 ease-in-out`} onClick={yes}>Yes</button>
            <button className='w-32 border-2 border-slate-500 bg-slate-500 hover:bg-white hover:text-slate-500 py-2 font-bold text-white text-lg ease-in-out duration-200' onClick={no}>No</button>
          </div>
        </div>
      </div>
  )
}
