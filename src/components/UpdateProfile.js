import React,{useState,useRef} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {Form,Card,Button,Alert} from 'react-bootstrap'
import {Link,useHistory} from 'react-router-dom'


export default function UpdateProfile() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    const {currentUser,updateEmail,updatePassword}=useAuth()
    const history=useHistory()

     function handleSubmit(e){
        e.preventDefault()
        if (passwordRef.current.value!==passwordConfirmRef.current.value){
            return setError("Passwords you entered must be same") 
        }
        const promises=[]
        setLoading(true)
        setError("")
        if(emailRef.current.value!==currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }   
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(()=>{
            history.push("/")
        }).catch(()=>{
            setError("Failed to update account!")
        }).finally(()=>{
            setLoading(false)
        })

    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile Update</h2>
                    {error&&<Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef}  
                            defaultValue={currentUser.email}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}
                            placeholder="Leave blank to keep password unchanged" />
                        </Form.Group>
                        <Form.Group id="pasword-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} 
                            placeholder="Leave blank to keep password unchanged"/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
          <Link to="/">Cancel</Link> 
            </div>
        </>
    )
}
