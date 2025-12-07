import React,{useEffect} from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Button from 'react-bootstrap/Button';
import { ListOrders } from "../../actions/orderActions";


function OrderListScreen({history}) {



    const dispatch=useDispatch()


    const orderList = useSelector(state=>state.orderList)
    const {loading,orders,error}=orderList


    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo}=userLogin






    useEffect(()=>{
        if (userInfo && userInfo.isAdmin){
            dispatch(ListOrders())
        }else{
            history.push('/login')
        }


        
        
    },[dispatch,history,userInfo])




    




  return (
    <div>
        <h1 style={{color: "white"}}>gtffh</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h5 style={{color: "white"}}>fhhf</h5>
  <Link to='/' className='btn btn-light my-3'> Go Back</Link>
        <h1>Orders</h1>
        {loading ? <Loader></Loader>
          : error ? <div class="alert alert-danger" role="alert">{error}</div>
            : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                     <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL PRICE</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                     </tr>
                    </thead>


                    <tbody>
                        {orders.map(order=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid?(
                                    order.paidAt.substring(0,10)
                                ):(
                                    <i className="fas fa-times" style={{color:"red"}}></i>

                                )}</td>

                                <td>{order.isDelivered?(
                                    order.deliveredAt.substring(0,10)
                                ):(
                                    <i className="fas fa-times" style={{color:"red"}}></i>

                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>Details</Button>
                                    </LinkContainer>

                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            )}
            


    </div>
  )
}

export default OrderListScreen