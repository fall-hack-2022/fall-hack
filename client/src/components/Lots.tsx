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

  useEffect(() => {
    fetch('/lots/getAll')
    .then(data => data.json())
    .then(data  => setLots(data))
  }, [])


  return (
    <div className="text-center">

        {lots.map((lot:Lot) => {
          return(    <div className="p-4 md:w-1/3">
          <div className="h-full border-2 border-red-300 border-opacity-60 rounded-lg overflow-hidden">
              <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-red-300 mb-1">Lot</h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Lot Name:<span className="mx-1">{lot.lot_name}</span></h1>
                  <p className="leading-relaxed mb-3">Lot Address:<span className="mx-1">{lot.address}</span></p>
                  <div className="text-start">
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Spots:  {lot.spots_filled/lot.spots_total < 1 ? <span className="text-green-500 mx-1">{lot.spots_filled}/{lot.spots_total}</span> : <span className="text-red-500 mx-1">Full</span>}</a>
                      <br />
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Status:  {lot.closed? <span className="text-red-500 mx-1"> Closed</span> : 
                    lot.maintenance? <span className="text-black mx-1"> Under Maintenance</span> : <span className="text-green-500 mx-1"> Open</span>}</a>
             
               
                  </div>
              </div>
          </div>
      </div>)
        })}
    </div>
  )
}

export default Lots