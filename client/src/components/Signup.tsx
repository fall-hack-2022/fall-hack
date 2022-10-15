import {useState} from "react";

function Signup(this: any) {
    const [input, setInput] = useState({
        password1: '',
        password2: ''
    })

    return (
        <div>
            <form action='/createUser' method='post'>
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
                    <input type="password" name="pass1" id='pw1' required />
                </div>
                <div className="input-container">
                    <label>Confirm Password </label>
                    <input type="password" name="pass2" id='pw2' required />
                </div>
                <div className="button-container">
                    {document.getElementById('pw1').value == document.getElementById('pw1')!.value ? <button type="submit">Submit</button> : <div>Entered Passwords do not match</div>}
                </div>
            </form>
        </div>
    )
}

export default Signup;