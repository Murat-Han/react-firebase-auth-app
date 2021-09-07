import React,{useState} from 'react'
import {Card,Button, Alert} from "react-bootstrap"
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory } from 'react-router-dom'


export default function Dashboard() {
    const [error,setError]=useState("")

    const {currentUser,logout}=useAuth()
    const history=useHistory()

    async function handleLogOut(){
        setError("")
        try {
          await  logout()
        history.push("/login")
        } catch (error) {
            setError("Failed to log out")
        }
        
    }

    return (
        <>
          <h2 className="w-100 text-center mb-4">Protected Area </h2> 
        <Card>
        <Card.Body>
            <h2 className="w-100 text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email: </strong>{currentUser&& currentUser.email}
            <Link to="/update-profile" className="w-100 btn btn-primary mt-3 mb-3">Update Profile</Link>
        </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogOut}>Log Out</Button>
        </div>
        </>
    )
}
