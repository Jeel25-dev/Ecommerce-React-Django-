import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Form,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
//import Message from "../Message";
import { getUserDetails,updateUser } from "../../actions/userActions";
import FormContainer from "../FormContainer";
import { USER_UPDATE_RESET } from "../../constants/userConstants";

function EditUserScreen({match,history}) {


    const userId=match.params.id



    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [isAdmin,setIsAdmin]=useState('')
    
    const dispatch = useDispatch()

 
    const userDetails = useSelector(state=>state.userDetails)
    const {error,loading,user }=userDetails


    const userUpdate = useSelector(state=>state.userUpdate)
    const {error:errorUpdate,loading:loadingUpdate,success:successUpdate }=userUpdate

    useEffect(()=>{
        if(successUpdate){
          dispatch({type:USER_UPDATE_RESET})
          history.push('/admin/userlist')
        }else{



        if(!user.name||user._id!==Number(userId)){
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)

        }}
       
    },[user,userId,successUpdate,history,dispatch])


    const submitHandler= (e)=>{
        e.preventDefault()
        dispatch(updateUser({_id:user._id,name,email,isAdmin}))
        
       
    }
    return (
        <div>
          <h1 style={{color: "white"}}>gtffh</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h5 style={{color: "white"}}>fhhf</h5>

            <Link className='btn btn-light my-3' to='/admin/userlist'>Go Back</Link>



       <FormContainer>
          <h1>Edit User</h1>

          {loadingUpdate&&<Loader></Loader>}
          {errorUpdate && <div class="alert alert-danger" role="alert">{errorUpdate}</div>}


          {loading?<Loader></Loader>:error?<div class="alert alert-danger" role="alert">{error}</div>:(

          <Form onSubmit={submitHandler}>


              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value)} ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email Address </Form.Label>
                <Form.Control  type='email' placeholder='Enter Email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group controlId='isadmin'>
                <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked)}></Form.Check>
              </Form.Group>

              

            <Button className='mt-3' type='submit' variant='success'>Update</Button>

          </Form>)}

          

         </FormContainer>
            
        </div>
    )
}

export default EditUserScreen