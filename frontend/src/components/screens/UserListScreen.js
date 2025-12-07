import React,{useEffect} from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Button from 'react-bootstrap/Button';
import { listUsers ,deleteUser} from "../../actions/userActions";

function UserListScreen({history}) {



    const dispatch=useDispatch()


    const userList = useSelector(state=>state.userList)
    const {loading,users,error}=userList


    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    const userDelete = useSelector(state=>state.userDelete)
    const {success:successDelete}=userDelete




    useEffect(()=>{
        if (userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }


        
        
    },[dispatch,history,successDelete,userInfo])




    const deleteHandler = (id) =>{

        if (window.confirm('Are You Sure')){
            dispatch(deleteUser(id))
        }
       
        
       
    }




  return (
    <div>
        <h1 style={{color: "white"}}>gtffh</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h5 style={{color: "white"}}>fhhf</h5>
  <Link to='/' className='btn btn-light my-3'> Go Back</Link>
        <h1>Users</h1>
        {loading ? <Loader></Loader>
          : error ? <div class="alert alert-danger" role="alert">{error}</div>
            : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                     <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                     </tr>
                    </thead>


                    <tbody>
                        {users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin?(
                                <i className="fas fa-check" style={{color:"green"}}></i>
                                ):(
                                    <i className="fas fa-times" style={{color:"red"}}></i>

                                )}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'><i className="fas fa-edit"></i></Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}><i className="fas fa-trash"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            )}
            


    </div>
  )
}

export default UserListScreen