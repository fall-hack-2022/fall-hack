import { useState, useEffect } from "react"



function Lots() {
  type Lot = {
    id: number;
  owner: number;
  lot_name: string;
  price: number;
  address: string;
  spots_total: number;
  spots_filled: number;
  maintenance: boolean;
  closed: boolean;
  }
  const [lots, setLots] = useState([])
  const [user, setUser] = useState();

  useEffect(() => {
    fetch("/users/getUser")
      .then((data) => data.json())
      .then((data) => setUser(data));
  }, []);
  useEffect(() => {
    fetch('/lots/getAll')
    .then(data => data.json())
    .then(data  => setLots(data))
  }, [])


  return (
    <div className="text-center flex flex-wrap">

        {lots.map((lot:Lot) => {
          return(    <div className="p-4 md:w-1/3">
          <div className="h-full border-2 border-red-300 border-opacity-60 rounded-lg overflow-hidden">
              <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-red-300 mb-1">Price: <span className="mx-1">{lot.price === 0 ? <span className="text-purple-500">FREE</span> : <span>${lot.price}/hr</span>}</span></h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Lot Name:<span className="mx-1">{lot.lot_name}</span></h1>
                  <p className="leading-relaxed mb-3">Lot Address:<span className="mx-1">{lot.address}</span></p>
                  <div className="text-start">
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Spots:  {lot.spots_filled/lot.spots_total < 1 ? <span className="text-green-500 mx-1">{lot.spots_filled}/{lot.spots_total}</span> : <span className="text-red-500 mx-1">Full</span>}</a>
                      <br />
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Status:  {lot.closed? <span className="text-red-500 mx-1"> Closed</span> : 
                    lot.maintenance? <span className="text-black mx-1"> Under Maintenance</span> : <span className="text-green-500 mx-1"> Open</span>}</a>
                  {user ? <div> <div className="flex my-1">
                  <form action={`/lots/addSpot/${lot.id}`} method='post'><input type='submit' className="bg-blue-400 py-2 cursor-pointer px-4 hover:bg-blue-700 text-black hover:text-white rounded" value="Add a Parked Car" /></form>
                  <form action={`/lots/removeSpot/${lot.id}`} method='post'><input type='submit' className="bg-red-400 py-2 mx-1 px-4 cursor-pointer hover:bg-red-700 text-black hover:text-white rounded" value="Remove a Parked Car" /></form>
                  </div>
                  <div className="flex">
                  {lot.closed ? <form action={`/lots/openLot/${lot.id}`} method='post'><input type='submit' className="bg-blue-400 py-2 cursor-pointer px-4 hover:bg-blue-700 text-black hover:text-white rounded" value="Open Lot" /></form>
                   : <form action={`/lots/closeLot/${lot.id}`} method='post'><input type='submit' className="bg-red-400 py-2  cursor-pointer px-4 hover:bg-red-700 text-black hover:text-white rounded" value="Close Lot" /></form>}
                 
                 {lot.maintenance ? <form action={`/lots/endMaintenance/${lot.id}`} method='post'><input type='submit' className="bg-blue-400 py-2 mx-1 cursor-pointer px-4 hover:bg-blue-700 text-black hover:text-white rounded" value="End Maintenance" /></form>
                   : <form action={`/lots/maintainLot/${lot.id}`} method='post'><input type='submit' className="bg-red-400 py-2 mx-1 cursor-pointer px-4 hover:bg-red-700 text-black hover:text-white rounded" value="Maintain Lot" /></form>}
                 
                 
                  </div></div>: <></>}
                  </div>
              </div>
          </div>
      </div>)
        })}
    </div>
  )
}

export default Lots