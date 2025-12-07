import React,{useState} from "react";
import { Form,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../FormContainer";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckoutSteps from "../CheckoutSteps";

function ShippingScreen({history}) {
  const cart=useSelector(state=>state.cart)

  const{ shippingAddress }= cart
  const dispatch = useDispatch()



  const [address,setAddress]=useState(shippingAddress.address)
  const [city,setCity]=useState(shippingAddress.city)
  const [postalCode,setPostalCode]=useState(shippingAddress.postalCode)
  const [country,setCountry]=useState(shippingAddress.country)



  const submitHandler= (e)=>{
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    history.push('/payment')
   
}




  return (
    <div>
      <h1 style={{color: "white"}}>gtffh</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h5 style={{color: "white"}}>fhhf</h5>
   
    <FormContainer>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <h1>Shipping Address</h1>
      <Form onSubmit={submitHandler}>


        <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='Enter Address' value={address?address:''} onChange={(e)=> setAddress(e.target.value)} required></Form.Control>
        </Form.Group>



        <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='Enter City' value={city?city:''} onChange={(e)=> setCity(e.target.value)} required></Form.Control>
        </Form.Group>


        <Form.Group controlId='postalCode'>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control type='number' placeholder='Enter PostalCode' value={postalCode?postalCode:''} onChange={(e)=> setPostalCode(e.target.value)} required></Form.Control>
        </Form.Group>


        <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='Enter Country' value={country?country:''} onChange={(e)=> setCountry(e.target.value)} required></Form.Control>
        </Form.Group>




        <Button type="submit" variant="primary">Continue</Button>


        

      </Form>
    </FormContainer></div>
  )
}

export default ShippingScreen