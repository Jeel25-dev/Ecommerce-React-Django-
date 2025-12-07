import React,{useState,useEffect} from 'react'
import {Row,Col,Image,ListGroup,Button,Card,Form} from 'react-bootstrap'
import Rating from '../Rating'
import Loader from '../Loader'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'

//import Message from '../Message'
import { useDispatch,useSelector } from 'react-redux'
import { listProductDetails , createProductReview} from '../../actions/productActions'
import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
//import products from '../../products'


function ProductScreen({match,history }) {

  const [qty,setQty]=useState(1)
  const [rating,setRating]=useState(0)
  const [comment,setComment]=useState('')
  

  
  




  
  const dispatch=useDispatch()


  const productDetails=useSelector(state=>state.productDetails)
  const {loading,error,product}=productDetails
  // console.log(product.review)
  
  


  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin

  const productReviewCreate=useSelector(state=>state.productReviewCreate)
  const {loading:loadingProductReview,error:errorProductReview,success:successProductReview,}=productReviewCreate

  
  

  useEffect(()=>{
    if(successProductReview || errorProductReview || loadingProductReview){
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(match.params.id))
    
    
  },[dispatch,match,successProductReview])




  const addToCartHandler = ()=>{
    history.push(`/cart/${match.params.id}?qty=${qty}`)

 }

  const submitHandler=(e)=>{
     e.preventDefault()
     dispatch(createProductReview(
        match.params.id,{
          rating,
          comment
        }
        
      ))
}

 
 

  
  





  return (
    <div>
       <h1 style={{color: "white"}}>gtffh</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h5 style={{color: "white"}}>fhhf</h5>
      <Link to='/' className='btn btn-light my-3'> Go Back</Link>


      {loading ?<Loader></Loader>
        :error?<h3>{error}</h3>
        :(
          <div>
            <Row>
              <Col md={6}>
              <Carousel>
                <Carousel.Item>
                  <Image src={product.image} alt={product.name} fluid></Image>
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={product.image2} alt={product.name} fluid></Image>
                </Carousel.Item>
              </Carousel>
                
                
              </Col>
              <Col md={3}>
                <ListGroup varient="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
      
                  <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#FFFF00'></Rating>
                  </ListGroup.Item>
      
                
                  <ListGroup.Item>
                    <h3>$ {product.price}</h3>
                  </ListGroup.Item>
      
                  <ListGroup.Item>
                    Description:{product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>$  {product.price}</strong></Col></Row>
                        <Row>
                        <Col>Status:</Col>
                        <Col>{product.countInStock > 0 ? 'In Stock':'Out Of Stock'}</Col></Row>
                        
                    
                    </ListGroup.Item>

                    {product.countInStock > 0 &&(
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col xs="auto" className="my-1">
                          <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                          </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}



                    <ListGroup.Item>
                      <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock===0} type='button'>Add To Cart</Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col md={6}>
                <h4>Reviews</h4>
                {product.review.length===0&&<div class="alert alert-info" role="alert">No Reviews</div>}

                <ListGroup variant='flush'>
                  {product.review.map((review)=>(
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} color='#f8e825'></Rating>
                      <p>{review.createdAt.substring(0,10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    <h4>Write a Review</h4>


                    {loadingProductReview && <Loader></Loader>}
                    {successProductReview && <div class="alert alert-success" role="alert">Review Submitted</div>}
                    {errorProductReview && <div class="alert alert-danger" role="alert">{errorProductReview}</div>} 



                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                            <option value=''>Select...</option>
                            <option value='1'>1-Poor</option>
                            <option value='2'>2-Fair</option>
                            <option value='3'>3-Good</option>
                            <option value='4'>4-Very Good</option>
                            <option value='5'>5-Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='comment'>
                          <Form.Label>Review</Form.Label>
                          <Form.Control as='textarea' row='5' value={comment} onChange={(e)=>setComment(e.target.value)}>
                          </Form.Control>
                        </Form.Group>

                        <Button
                         disabled={loadingProductReview} type='submit' variant='primary'>Submit</Button>
                    </Form>
                    ):(
                      <div class="alert alert-info" role="alert">Please <Link to='/login'>Login</Link></div>
                    )}
                  </ListGroup.Item>


                </ListGroup>
              </Col>
            </Row>


            
        </div>    
       )}
             




      
   </div>
  )
}

export default ProductScreen