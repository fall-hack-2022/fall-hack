import { useParams } from 'react-router-dom'
function Login() {

    let { query } = useParams()

    return (
        <div className="text-center">
            <br/>
            <h1 className="mb-8 text-3xl text-center">Login to LastSpot</h1>
            { query === "incorrect" ? <p className='text-red-500'>That password was incorrent</p> : <></>}
            <form action="/users/login" method='post'>
                <div className="input-container">
                    <input placeholder="Username" type="text" name="username" className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <br/>
                <div className="input-container">
                    <input placeholder="Password" type="password" name="password" className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <br/>
                <div className="w-half">
                    <input className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 cursor-pointer dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default Login;