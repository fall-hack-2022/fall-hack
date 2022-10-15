import {useState} from "react";

function Signup(this: any) {

    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const setP1 = (e: any) => {
        setPassword1(e.target.value)
    }

    const setP2 = (e: any) => {
        setPassword2(e.target.value)
    }

    return (
        <div>
            <br/>
            <h1 className="mb-8 text-3xl text-center">Register for LastSpot</h1>
            <form action='/users/createUser' method='post' className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="input-container">
                    <input placeholder="First Name" className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           type="text" name="fname" required />
                </div>
                <br/>
                <div className="input-container">
                    <input placeholder="Last Name" className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" name="lname" required />
                </div>
                <br/>
                <div className="input-container">
                    <input placeholder="Username " className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" name="uname" required />
                </div>
                <br/>
                <div className="input-container">
                    <input placeholder="Email" className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email" name="email" required />
                </div>
                <br/>
                <div className="input-container">
                    <input placeholder="Password" className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password" name="pass1" id='pw1' onChange={setP1} required />
                </div>
                <br/>
                <div className="input-container">
                    <input placeholder="Confirm Password" className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password" name="pass2" id='pw2' onChange={setP2} required />
                </div>
                <br/>
                <div className="w-half">
                    {password1 === password2 ? <button   className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit">Submit</button> : <div>Entered Passwords do not match</div>}
                </div>
            </form>
        </div>
    )
}

export default Signup;