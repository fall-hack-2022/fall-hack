import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='flex px-2 p-3 h-fit bg-red-300'>
        <div className=' mx-auto font-bold'>
        <Link to="/" className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:underline hover:bg-red-700'>Home</Link>
        <Link to="/login"  className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:underline hover:bg-red-700'>Login</Link>
        <Link to="/signup" className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:underline hover:bg-red-700'>Signup</Link>
        <Link to="/lots" className='mx-2 text-black bg-red-200 px-4 py-2 rounded hover:underline hover:bg-red-700'>Lots</Link>
        </div>
    </div>
  )
}

export default Header