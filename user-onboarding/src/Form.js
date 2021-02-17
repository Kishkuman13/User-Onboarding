import React from 'react'

export default function AccountForm(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        const { name, value, type, checked } = evt.target
        const returnValue = type === 'checkbox' ? checked : value
        change(name, returnValue)
    }

    return (
        <form className='form wrapper' onSubmit={onSubmit}>
            <div className='form-cont'>
                <h2>Add Account</h2>
                <button disabled={disabled}>Submit</button>
                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.tos}</div>
                </div>
            </div>
            <div className='form-cont inputs'>
                <h4>Account Information</h4>
                <label>Name
                    <input
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                    />
                </label>
                <label>Email
                    <input
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='email'
                    />
                </label>
                <label>Password
                    <input
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='text'
                    />
                </label>
                <label>Terms of Service
                    <input
                        checked={values.tos}
                        onChange={onChange}
                        name='tos'
                        type='checkbox'
                    />
                </label>
            </div>
        </form>
    )
}
