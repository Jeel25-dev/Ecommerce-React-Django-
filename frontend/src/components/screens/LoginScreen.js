import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Row, Col,Form,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
//import Message from "../Message";
import { login } from "../../actions/userActions";
import FormContainer from "../FormContainer";

function LoginScreen({location,history}) {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] :'/'
 
    const userLogin = useSelector(state=>state.userLogin)
    const {error,loading,userInfo}=userLogin

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])


    const submitHandler= (e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }
    return (
        <div>
            <h1 style={{color: "white"}}>gtffh</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h5 style={{color: "white"}}>fhhf</h5>

         <FormContainer>
          <h1>Sign In</h1>
          {error && <h4>{error}</h4>}
          {loading && <Loader />}

          <Form onSubmit={submitHandler}>


              <Form.Group controlId='email'>
                <Form.Label>Email Address </Form.Label>
                <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
              </Form.Group>

            <Button className='mt-3' type='submit' variant='primary'>Sign In</Button>

          </Form>

          <Row className='py-3'>
              <Col>
              New Customer? 
              <Link to ={redirect?`/register?redirect=${redirect}`:'/register'}>Register</Link>
              </Col>

          </Row>

         </FormContainer>
        </div>
    )
}

export default LoginScreen