import React, {useEffect, useState} from "react";
import {Row,Col,Image,Card,ListGroup, Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { PayPalButton } from "react-paypal-button-v2";
import {  useSelector,useDispatch } from "react-redux";
import Loader from '../Loader'
//import Message from '../Message'
//import FormContainer from "../FormContainer";
import { getOrderDetails,payOrder,deliverOrder } from "../../actions/orderActions";
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from "../../constants/orderConstants";

function OrderScreen ({match,history}) {
  const orderId=match.params.id
  const dispatch=useDispatch()  

  const [sdkReady,setSdkReady]=useState(false)



  const orderDetails=useSelector(state=>state.orderDetails)
  const { order, error, loading}=orderDetails  


  const orderPay=useSelector(state=>state.orderPay)
  const { loading:loadingPay,success:successPay}=orderPay 

  const orderDeliver=useSelector(state=>state.orderDeliver)
  const { loading:loadingDeliver,success:successDeliver}=orderDeliver

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo}=userLogin

  if(!loading && !error) {
    order.itemsPrice=order.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2)}
  
   

  const addPayPalScript=()=>{
    const script=document.createElement('script')
    script.type='text/javascript'
    script.src='https://www.paypal.com/sdk/js?client-id='
    script.async=true
    script.onload=()=>{
        setSdkReady(true)
    }
    document.body.appendChild(script)
}
  
  
    useEffect(()=>{
    if(!userInfo){
        history.push('/login')
    }

    if (!order||successPay|| order._id!==Number(orderId)||successDeliver) {
        dispatch({type:ORDER_PAY_RESET})
        dispatch({type:ORDER_DELIVER_RESET})
        dispatch(getOrderDetails(orderId))
    }else if(!order.isPaid){
        if(!window.paypal){
            addPayPalScript()
        }else{
            setSdkReady(true)
        }
    }
  },[order,orderId,dispatch,successPay,successDeliver,userInfo,history])




  const successPaymentHandler=(paymentResult)=>{
    dispatch(payOrder(orderId,paymentResult))

  }


  const deliverHandler=()=>{
    dispatch(deliverOrder(order))
  }


  
 
  return( 
    


    loading?(
    
    <Loader></Loader>
  ):error?(
    <h5>{error}</h5>
  ):(
    <div>
        <h1 style={{color: "white"}}>gtffh</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h5 style={{color: "white"}}>fhhf</h5>
        <h1>Order:{order._id}</h1>
        <Row>
            <Col md={8}>
                    <ListGroup varient='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name:{order.user.name}</strong></p>
                            <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>

                            <p>
                                <strong>Shipping:</strong>
                                {order.shippingAddress.address},{order.shippingAddress.city},
                                {'   '}
                                {order.shippingAddress.postalCode},
                                {'   '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered?(
                                <div class="alert alert-success" role="alert">Delivered On:{order.deliveredAt.substring(0,10)}</div>
                            ):(
                                <div class="alert alert-warning" role="alert">Not Delivered</div>
                            )}
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>   
                            {order.isPaid?(
                                <div class="alert alert-success" role="alert">Paid On:{order.paidAt.substring(0,10)}</div>
                            ):(
                                <div class="alert alert-warning" role="alert">Not Paid</div>
                            )}
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length===0?<h2>
                                Order is empty
                            </h2>:(
                                <ListGroup varient='flush'>
                                    {order.orderItems.map((item,index)=>(
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt=".name" fluid rounded></Image>
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} x ${item.price} =${(item.qty*item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    ))}
                                </ListGroup>
                            )}

                                
                        </ListGroup.Item>
                    </ListGroup>

            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Item:</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader></Loader>}

                                {!sdkReady?(
                                    <Loader></Loader>
                                ): (
                                    <PayPalButton
                                     amount={order.totalPrice}
                                     onSuccess={successPaymentHandler}></PayPalButton>
                                )}
                            </ListGroup.Item>
                        )}

                        

                        
                    </ListGroup>


                    {loadingDeliver && <Loader></Loader>}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                            <center><Button type="button" className="btn btn-block" onClick={deliverHandler}>Mark As Delivered</Button></center>
                        </ListGroup.Item>
                    )}
                </Card>

            </Col>
        </Row>

    </div>
  )
  )}

export default OrderScreen