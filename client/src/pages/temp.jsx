import React from "react"
import { Link } from "react-router-dom"

const TempPage = () => {

    return (
        <div>
            <h3>Welcome to the React Router</h3>
            <small>Temp Page</small>
            <div>
                <Link to="/">Show List of Users</Link>
            </div>
        </div>
    )
}

export default TempPage