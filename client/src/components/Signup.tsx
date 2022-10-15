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
        <div className="text-center">
            <form action='/users/createUser' method='post'>
                <div className="input-container">
                    <label>First Name </label>
                    <input type="text" name="fname" required />
                </div>
                <div className="input-container">
                    <label>Last Name </label>
                    <input type="text" name="lname" required />
                </div>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                </div>
                <div className="input-container">
                    <label>Email </label>
                    <input type="text" name="email" required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass1" id='pw1' onChange={setP1} required />
                </div>
                <div className="input-container">
                    <label>Confirm Password </label>
                    <input type="password" name="pass2" id='pw2' onChange={setP2} required />
                </div>
                <div className="button-container">
                    {password1 === password2 ? <button type="submit">Submit</button> : <div>Entered Passwords do not match</div>}
                </div>
            </form>
        </div>
    )
}

export default Signup;