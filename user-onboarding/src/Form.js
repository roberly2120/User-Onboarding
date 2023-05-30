import React from 'react'

export default function Form (props) {
    const { values, change, submit, errors, disabled } = props

    const onSubmit = event => {
        event.preventDefault();
        submit()
    }
    const onChange = event => {
        const { name, value, checked, type } = event.target
        const valueToUse = type ==="checkbox" ? checked : value
        change(name, valueToUse)
    }
    return (
        <form onSubmit={onSubmit}>
            <h2>User Input Form</h2>
            <div className='errors'>
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.emailTaken}</div>
            </div>
            <div className='user-input'>
                <label>Name:  
                    <input
                        value={values.name} 
                        type='text'
                        name="name"
                        placeholder='Enter First and Last Name' 
                        onChange={onChange}
                    />             
                </label>
                <label>Email:
                    <input
                        value={values.email}
                        type="text"
                        name="email"
                        placeholder='Enter Valid Email'
                        onChange={onChange}
                    />
                </label>
                <label>Role:
                    <select value={values.role} name='role' onChange={onChange}>
                        <option value=""> - Select Role - </option>
                        <option value="Management">Management</option>
                        <option value="Web-Design">Web Design</option>
                        <option value="Sales">Sales</option>
                        <option value="Backend">Backend</option>
                    </select>
                        

                </label>
                <label>Password:&nbsp;
                    <input
                        value={values.password}
                        type="text"
                        name="password"
                        placeholder='Enter Desired Password'
                        onChange={onChange}
                    />
                </label>
                <label>Terms and Conditions
                    <input
                        checked={values.terms}
                        type="checkbox"
                        name="terms"
                        onChange={onChange}
                    />
                </label>
                <button disabled={disabled}>submit</button>

            </div>
        </form>
    )
}