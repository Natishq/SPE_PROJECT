import React from 'react'
import "../styles.css"
 import Base from "./Base"

export default function Home() {

    console.log("API IS", process.env.REACT_APP_BACKEND);
    return (
        <Base>
        <div>
            <h1>Hello frontend Home</h1>
        </div>
        </Base>
    )
}
