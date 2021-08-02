import React, { useEffect } from 'react'

export const AeaModal = ({onClick}) => {
    
    const HandleClick=()=>{
        console.log("Click")
    }
    useEffect(() => {
        console.log("Aea")
    }, [])
    return (
        <div>
            <h1>Modal</h1>
            <input onChange={HandleClick}></input>
            <button onClick={()=>onClick}>Click</button>
        </div>
    )
}