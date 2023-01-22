import React from 'react';

const Alert = (props) => {
    const { type } = props;

    return (
        <div className='alert'>
            {
                type === 'login' ? 
                    <div class="alert alert-warning" role="alert">
                        Invalid login! Please enter valid credentials or signup.
                    </div>
                :
                    <div class="alert alert-warning" role="alert">
                        Invalid signup! Please enter valid credentials.
                    </div>
            }
        </div>
    )
}

export default Alert;