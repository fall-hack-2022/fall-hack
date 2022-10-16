import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'; 
function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch("/users/getUser")
      .then((data) => data.json())
      .then((data) => setUser(data));
  });
  return (
    <div className='flex px-2 p-3 h-fit bg-red-300'>
        <div className=' mx-auto font-bold'>
        <Link to="/" className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:underline hover:bg-red-700'>Home</Link>
        {user ? <></> :
        <>
          <Link to="/login"  className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:underline hover:bg-red-700'>Login</Link>
          <Link to="/signup" className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:underline hover:bg-red-700'>Signup</Link>
        </>}
        <Link to="/lots" className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:underline hover:bg-red-700'>Lots</Link>
          
        {user ? <> <Link to="/newlot" className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:underline hover:bg-red-700'>New Lot</Link><form className='inline' method="post" action="/logout">
        <input type="Submit" value='Sign Out' className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:underline hover:bg-red-700'/></form> </> : <></> }
        </div>
    </div>
  )
}

export default Header