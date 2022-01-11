import {ChangeEvent, FormEvent, useState} from 'react'

const Registration = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.currentTarget.value)
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.currentTarget.value)
    }

    const handleConfirmChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setConfirm(e.currentTarget.value)
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = {
            email: email,
            password: password
        }

        resetForm()

        console.log(formData)
    }

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setConfirm('')
    }

    return (
        <>
            <h3>Sign up</h3>
            <form onSubmit={handleFormSubmit} onReset={resetForm}>
                <div>
                    <label>
                        Email <br/>
                        <input onChange={handleEmailChange}
                               type="text"
                               placeholder="example@inbox.com"
                               name="email"
                               value={email}/>
                    </label>
                </div>
                <div>
                    <label>
                        Password <br/>
                        <input onChange={handlePasswordChange}
                               type="password"
                               placeholder="********"
                               name="password"
                               value={password}/>
                    </label>
                </div>
                <div>
                    <label>
                        Confirm password <br/>
                        <input onChange={handleConfirmChange}
                               type="password"
                               placeholder="********"
                               name="confirm"
                               value={confirm}/>
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
