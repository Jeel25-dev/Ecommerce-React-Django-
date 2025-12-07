import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating"
import { Link } from "react-router-dom"

function Product({ product }) {
  return (
    <Card className="my-3 p-3">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body className="my-3 p-3">
      <Link style={{textDecoration: 'none'}} to={`/product/${product._id}`}>
        <Card.Title as="div" />
        <strong>{product.name}</strong>
      </Link>
      <Card.Text as="div">
        <div className="my-3">
               
               <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#FFFF00'}></Rating>
        </div>
      </Card.Text>

      <Card.Text as="h3">
        
           $  {product.price} 
    
      </Card.Text>
    </Card.Body>
    </Card>
  );
}

export default Product;
