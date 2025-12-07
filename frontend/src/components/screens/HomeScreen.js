import React,{useEffect} from 'react'
//import products from '../../products'
import {Row,Col,} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import Product from '../Product'
import Loader from '../Loader'
import { useDispatch,useSelector } from 'react-redux'
import { listProducts } from '../../actions/productActions'
import Paginate from '../Paginate'


//import Message from '../Message'


function HomeScreen({ history }) {
  const dispatch=useDispatch()
  const productList=useSelector(state=>state.productList)
  const {error,loading,products,page,pages}=productList
  

  let keyword=history.location.search
  
  useEffect(()=>{
    dispatch(listProducts(keyword))
    

    
  },[dispatch,keyword])


  

  return (




      //carousal



<div>
 
 <h1 style={{color: "white"}}>gtffh</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h5 style={{color: "white"}}>fhhf</h5>
 
 

    
  
       <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/c1.jpg"
            alt="First slide" />
          <Carousel.Caption>
            <h3>Category Name</h3>
            <p>Category Description</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/c2.jpg"
            alt="Second slide" />

          <Carousel.Caption>
            <h3>Category Name</h3>
            <p>Category Description</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/c3.jpeg"
            alt="Third slide" />

          <Carousel.Caption>
            <h3>Category Name</h3>
            <p>
            Category Description
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>  
      


     
        <h1 className='text-center'> All products</h1>


        {loading ? <Loader></Loader>
          : error ? <div class="alert alert-danger" role="alert">{error}</div>
            :
            <div>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} ld={4} xl={3}>
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword}></Paginate>
            </div>
            }





      </div>
  )
}

export default HomeScreen