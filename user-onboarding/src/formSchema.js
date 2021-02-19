import * as Yup from 'yup'

const FormSchema = Yup.object().shape({
    name: Yup
        .string()
        .trim()
        .required('Name required'),
    email: Yup
        .string()
        .email('Please enter a valid email')
        .required('Email required'),
    password: Yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required(),
    tos: Yup
        .boolean()
        .oneOf([true], 'Accept Terms of Service!')
})

export default FormSchema