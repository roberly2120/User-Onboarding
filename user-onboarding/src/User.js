import React from 'react';

export default function User(props) {
    const { details } = props;

    // const passwordHider = (pw) => {
    //     return(pw.map(letter => {
    //         letter = "#"
    //     }))
        
    // }

    return (
        <div className='user-details'>
            <p className='name'>Name: {details.name}</p>
            <p>Email: {details.email}</p>
        </div>
    )
}