import React from 'react'

function Account({ details }) {
    if (!details) {
        return <h3>Loading Account</h3>
    }
    return (
        <div className='account wrapper'>
            <h2>{details.name}</h2>
            <p>Email: {details.email}</p>
            <p>Password: {details.password}</p>
            <p>Terms of Service: {details.tos ? 'Accepted' : 'How?'}</p>
        </div>
    )
}
export default Account