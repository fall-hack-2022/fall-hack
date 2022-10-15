import { useState, useEffect } from "react"

function Lots() {

  const [lots, setLots] = useState([{id: "",
    owner: 0,
    lot_name: "",
    price: 0,
    address: "",
    spots_total: 0,
    spots_filled: 0,
    maintenance: false,
    closed: false
}])

  useEffect(() => {
    fetch('/lots/getAll')
    .then(data => data.json())
    .then(data => setLots(data))
  })


  return (
    <div className="text-center">
        <div>ASJDFK:SDAJGK:LADWSJGLK:</div>
        {lots.map(lot => {
          return(<div>{lot.lot_name}</div>)
        })}
    </div>
  )
}

export default Lots