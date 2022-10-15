import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='flex px-2 p-2'>
        <div className=' mx-auto'>
        <Link to="/" className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:bg-red-700'>Home</Link>
        <Link to="/login"  className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:bg-red-700'>Login</Link>
        <Link to="/signup" className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:bg-red-700'>Signup</Link>
        <Link to="/Lot" className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:bg-red-700'>Lot</Link>
        </div>
    </div>
  )
}

export default Header