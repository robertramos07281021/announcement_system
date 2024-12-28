/* eslint-disable react/prop-types */
export const ViewFilesModal = ({close, title, src}) => {
  return (
    <div className="w-full h-full absolute top-0 left-0 bg-white/30 backdrop-blur-[1.8px] flex items-center justify-center">
      <div className="h-5/6 shadow-xl shadow-black/50 rounded w-7/12 flex flex-col bg-black">
        <div className="p-2 flex justify-between">
          <h1 className="text item-xl text-white font-bold">{title}</h1>
          <div className=" text-white font-bold px-2 cursor-pointer" onClick={close}>X</div>
        </div>
        <div className="h-full m-1 mt-0 bg-white flex items-center justify-center">
          {
            title === "Tv Video"  &&
            <video src={`/uploads/${src}`} controls muted className="w-full"></video>
          }
          {
           title === "Video" &&
            <video src={`/uploads/${src}`} controls muted className="w-full"></video>
          }
          {
            title === "Image" &&
            <img src={`/uploads/${src}`} alt="image uploaded" className="h-full"/>
          }
         
        </div>
      </div>
    </div>
  )
}
