import React, { useEffect} from 'react'

function Emailconfirm({match}) {
    useEffect(() => {
        fetch(`/verify/${match.params.id}`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            
          })
            .then((res) => res.json())
            
            .catch((res) => console.log(res));
    })
    
    return (
        <div>
            <h1>You have Successfully verified your account</h1>
            <a href='/login'>Click here to login and enjoy</a>
        </div>
    )
}

export default Emailconfirm
