
function Login() {

    return (
        <div>
            <form action="/users/login" method='post'>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <div className="button-container">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;