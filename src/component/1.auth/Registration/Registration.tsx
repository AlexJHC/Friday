const Registration = () => {
    return (
        <>
            <h3>Sign up</h3>
            <form>
                <div>
                    <label>
                        Email <br/>
                        <input type="text" name="email"/>
                    </label>
                </div>
                <div>
                    <label>
                        Password <br/>
                        <input type="password" name="password"/>
                    </label>
                </div>
                <div>
                    <label>
                        Confirm password <br/>
                        <input type="password" name="confirm"/>
                    </label>
                </div>
                <div>
                    <button type="reset">Cancel</button>
                    <button type="submit">Register</button>
                </div>
            </form>
        </>
    )
}

export default Registration
