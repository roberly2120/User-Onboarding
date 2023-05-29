import logo from './logo.svg';
import React, { useState } from 'react'
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
}
const initialUsers = [{
  name: "Eric Bananagrams",
  email: "eric@iheartbananas.com",
  password: "orangeyouglad",
  terms: true
}]

const initialFormErrors = [{
  name: '',
  email: '',
  password: '',
  terms: ''
}]

function App() {
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
      console.log(res.data);
      setUsers([...users, newUser])
    })
    .catch(err => console.error(err))
  }

  const submitForm = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms ? "agreed" : "didn't agree"
    }
    
    postNewUser(newUser);
    setFormValues(initialFormValues);
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({...formValues, [name]: value})
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]: ""}))
      .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }


  return (
    <div className='app-container'>
      <h1 className='title'>Look at all of the users!</h1>
      <div className="container">

        <div className='form-container'>
          <Form 
            values={formValues}
            change={inputChange}
            submit={submitForm}
            errors={formErrors}
          />
        </div>
        <div className='users-container'>
        <h2 className='details-title'>User Details</h2>
          {
            users.map((user, idx) => {
              return (
                <User key={idx} details={user} />
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
