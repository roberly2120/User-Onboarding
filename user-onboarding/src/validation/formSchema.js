import * as yup from 'yup'

const formSchema = yup.object().shape({
name:yup
    .string()
    .trim()
    .required("Username is a required field!")
    .min(3, "Username must be at least 3 characters in length"),
email:yup
    .string()
    .email("Please enter a valid email")
    .required("Email is a required field!"),
password:yup
    .string()
    .required("Please choose a password"),
terms:yup.boolean()


})

export default formSchema;