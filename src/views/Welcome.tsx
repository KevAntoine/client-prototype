import React, { useContext, useState } from 'react'
import { setSessionCookie, getSessionCookie, SessionContext } from '../sessions'
import { History } from 'history'
import { useProxy } from 'valtio/macro'

import store from '../store'

interface ChildComponentProps {
    history: History
    /* other props for ChildComponent */
}

export const Welcome: React.SFC<ChildComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('')
    console.log(useContext(SessionContext))

    const { setSession } = useContext(SessionContext)
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            setSessionCookie(email)
            setSession(getSessionCookie())
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    useProxy(store)

    return (
        <div style={{ marginTop: '1rem' }}>
            <h3>{store.title}</h3>
            <div>{JSON.stringify(store.text)}</div>
            <form onSubmit={handleSubmit}>
                <input
                    className="form__field"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input className="btc" type="submit" value="subscribe" />
            </form>
        </div>
    )
}
