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
  })


  return (
    <div className="text-center">

        {lots.map((lot:Lot) => {
          return(    <div className="p-4 md:w-1/3">
          <div className="h-full border-2 border-red-300 border-opacity-60 rounded-lg overflow-hidden">
              <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-red-300 mb-1">Lot</h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Lot Name: {lot.lot_name}</h1>
                  <p className="leading-relaxed mb-3">Lot Address:{lot.address}</p>
                  <div className="flex items-center ">
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Spots: {lot.spots_filled}/{lot.spots_total}</a>
                      <br />
                      <br />
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Status: {lot.closed? "Closed" : lot.maintenance? "Under Maintenance" : "Open"}</a>
             
               
                  </div>
              </div>
          </div>
      </div>)
        })}
    </div>
  )
}

export default Lots