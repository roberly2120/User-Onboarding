import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import './App.css';
import Form from './Form';
import User from './User'
import axios from 'axios'
import * as yup from 'yup'
import schema from './validation/formSchema'

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  terms: false,
  role: "",
}


const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: '',
  emailTaken: ''
}
const initialDisabled = true;
function App() {
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
      console.log(res.data);
      setUsers([...users, newUser])
    })
    .catch(err => console.error(err))
  }

  const emailCheck = (email) => {
    if (email === 'waffle@syrup.com') {
      setDisabled(true)
      setFormErrors({...formErrors, [formErrors.emailTaken]: "That email is already taken"})
    }
  }
  const submitForm = () => {

    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms ? "agreed" : "didn't agree",
      role: formValues.role
    }
    
    postNewUser(newUser);
    setFormValues(initialFormValues);
  }

  const inputChange = (name, value) => {
    // need to work on emailCheck
    if(name == "email") {
    emailCheck(value);
    }
    validate(name, value);
    setFormValues({...formValues, [name]: value})
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]: ""}))
      .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className='app-container'>
      <div className='title-container'>
      <h1 className='title'>Look at all of the users!</h1>
      </div>
      <div className="container">

        <div className='form-container'>
          <Form 
            values={formValues}
            change={inputChange}
            submit={submitForm}
            errors={formErrors}
            disabled={disabled}
          />
        </div>
        <div className='users-container'>
        <h2 className='details-title'>User Details</h2>
          { users.length >= 1  ? 
            users.map((user, idx) => {
              return (
                <User key={idx} details={user} />
              )
            }) : "No User Info To Display" 
          }
        </div>
      </div>
    </div>
  );
}

export default App;
