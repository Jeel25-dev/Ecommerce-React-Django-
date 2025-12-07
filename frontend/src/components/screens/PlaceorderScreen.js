import React, { useEffect} from "react";
import { Button,Row,Col,Image,Card,ListGroup } from "react-bootstrap";
import {Link} from 'react-router-dom'
import {  useSelector,useDispatch } from "react-redux";
//import FormContainer from "../FormContainer";
import CheckoutSteps from "../CheckoutSteps";
import { createOrder } from "../../actions/orderActions";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";

function PlaceorderScreen ({history}) {
  const orderCreate=useSelector(state=>state.orderCreate)
  const { order, error, success}=orderCreate  

  const dispatch=useDispatch()  
  const cart=useSelector(state=>state.cart)

  cart.itemsPrice=cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2)
  cart.shippingPrice=(0).toFixed(2)
  cart.taxPrice=Number((0.18)*cart.itemsPrice).toFixed(2)
  cart.totalPrice=(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)
  

  if(!cart.paymentMethod){
    history.push('/payment')
  }
  
  
  
  useEffect(()=>{
    if (success) {
        history.push(`/order/${order._id}`)
        dispatch({type:ORDER_CREATE_RESET})
    }
  });

  
  const placeOrder=()=>{
    dispatch(createOrder({
        orderItems:cart.cartItems,
        shippingAddress:cart.shippingAddress,
        paymentMethod:cart.paymentMethod,
        itemsPrice:cart.itemsPrice,
        shippingPrice:cart.shippingPrice,
        taxPrice:cart.taxPrice,
        totalPrice:cart.totalPrice,
    }))
  }
  return (
    <div>
        <h1 style={{color: "white"}}>gtffh</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h5 style={{color: "white"}}>fhhf</h5>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <Row>
            <Col md={8}>
                    <ListGroup varient='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Shipping:</strong>
                                {cart.shippingAddress.address},{cart.shippingAddress.city},
                                {'   '}
                                {cart.shippingAddress.postalCode},
                                {'   '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>Method:</strong>
                                {cart.paymentMethod}
                            </p>    
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length===0?<div class="alert alert-warning" role="alert">
                                your cart is empty
                            </div>:(
                                <ListGroup varient='flush'>
                                    {cart.cartItems.map((item,index)=>(
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
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <h4>{error}</h4>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button 
                            type="button"
                            className="btn-block"
                            disabled={cart.cartItems===0}
                            onClick={placeOrder}>Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

            </Col>
        </Row>

    </div>
  )
}

export default PlaceorderScreen