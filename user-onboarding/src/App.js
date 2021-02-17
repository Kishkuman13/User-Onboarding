import axios from 'axios'
import * as yup from 'yup'
import React, { useState, useEffect } from 'react'
import AccountForm from './Form'
import Account from './Account'
import FormSchema from './formSchema'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  tos: false
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  tos: ''
}
const initialAccounts = []
const initialDisabled = true


export default function App() {
  const [users, setusers] = useState(initialAccounts)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const inputChange = (name, value) => {
    yup.reach(FormSchema, name)
      .validate(value)
        .then(() => setFormErrors({...formErrors, [name]: ''}))
        .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const postNewAccount = newAccount => {
    axios.post('https://reqres.in/api/users', newAccount)
      .then(res => {
        console.log(res)
        setusers([...users, res.data])
      })
    setFormValues(initialFormValues)
  }

  const formSubmit = () => {
    const newAccount = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: !!formValues.tos
    }
    postNewAccount(newAccount)
  }

  useEffect(() => {
    FormSchema.isValid(formValues)
      .then(isValid => setDisabled(!isValid))
      .catch(err => console.log(err))
  }, [formValues])

  return (
    <div className='wrapper'>
      <header>
        <h1>User Onboarding</h1>
      </header>

      <AccountForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => {
          return (
            <Account key={user.id} details={user} />
          )
        })
      }
    </div>
  )
}
