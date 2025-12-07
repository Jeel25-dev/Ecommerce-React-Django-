import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
//import Message from "../Message";
import { listProductDetails,updateProduct } from "../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";
import FormContainer from "../FormContainer";

function ProductEditScreen({match,history}) {


    const productId=match.params.id



    const [name,setName]=useState('')
    const [price,setPrice]=useState()
    const [image,setImage]=useState('')
    const [image2,setImage2]=useState('')
    const [brand,setBrand]=useState('')
    const [category,setCategory]=useState('')
    const [countInStock,setCountInStock]=useState()
    const [description,setDescription]=useState('')
    const [uploading,setUploading]=useState(false)
    
    const dispatch = useDispatch()

 
    const productDetails = useSelector(state=>state.productDetails)
    const {error,loading,product }=productDetails

    const prouctUpdate = useSelector(state=>state.prouctUpdate)
    const {loading:loadingproductUpdate,success:successproductUpdate,error:errorproductUpdate }=prouctUpdate


    

    useEffect(()=>{

      if(successproductUpdate){
        dispatch({type:PRODUCT_UPDATE_RESET})
        history.push('/admin/productlist')
      }else{

        if(!product.name||product._id!==Number(productId)){
            dispatch(listProductDetails(productId))
        }else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setImage2(product.image2)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)

        }
      }
       
    },[product,productId,history,dispatch,successproductUpdate])


    const submitHandler= (e)=>{
        e.preventDefault()
        dispatch(updateProduct({
          _id:productId,
          name,
          price,
          image,
          image2,
          brand,
          category,
          countInStock,
          description
        }))
       
    }



    const uploadFileHandler = async(e)=>{
      const file = e.target.files[0]
      const formData = new FormData() 

      formData.append('image',file)
      formData.append('product_id',productId)

      setUploading(true)

      try{
        const config = {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }

        const{data}=await axios.post('/api/products/upload/',formData,config)

        setImage(data)
        setUploading(false)

      }catch(error){
        setUploading(false)
      }
    }


    const uploadFileHandler2 = async(e)=>{
      const file = e.target.files[0]
      const formData = new FormData()

      formData.append('image2',file)
      formData.append('product_id',productId)

      setUploading(true)

      try{
        const config = {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }

        const{data}=await axios.post('/api/products/upload2/',formData,config)

        setImage2(data)
        setUploading(false)

      }catch(error){
        setUploading(false)
      }
    }



    return (
        <div>
          <h1 style={{color: "white"}}>gtffh</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h5 style={{color: "white"}}>fhhf</h5>

            <Link className='btn btn-light my-3' to='/admin/productlist'>Go Back</Link>



       <FormContainer>
          <h1>Edit Product</h1>

          {loadingproductUpdate &&<Loader></Loader>}
          {errorproductUpdate && <div class="alert alert-danger" role="alert">{errorproductUpdate}</div>} 


          {loading?<Loader></Loader>:error?<div class="alert alert-danger" role="alert">{error}</div>:(

          <Form onSubmit={submitHandler}>


              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value)} ></Form.Control>
              </Form.Group>

              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e)=> setPrice(e.target.value)} ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control type='text' placeholder='Enter Image' value={image} onChange={(e)=> setImage(e.target.value)} ></Form.Control>
              
              <Form.Control type="file" id="image-file" label='choose file' custom onChange={uploadFileHandler}></Form.Control>
              {uploading && <Loader></Loader>}

              </Form.Group>

              <Form.Group controlId='image2'>
                <Form.Label>Second Image</Form.Label>
                <Form.Control type='text' placeholder='Enter another Image' value={image2} onChange={(e)=> setImage2(e.target.value)} ></Form.Control>
              
                <Form.Control type="file" id="image-file" label='choose file' custom onChange={uploadFileHandler2}></Form.Control>
                {uploading && <Loader></Loader>} 
              
              </Form.Group>

              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e)=> setBrand(e.target.value)} ></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e)=> setCategory(e.target.value)} ></Form.Control>
              </Form.Group>


              <Form.Group controlId='countInStock'>
                <Form.Label>Stock</Form.Label>
                <Form.Control type='number' placeholder='Enter Stock' value={countInStock} onChange={(e)=> setCountInStock(e.target.value)} ></Form.Control>
              </Form.Group>

              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e)=> setDescription(e.target.value)} ></Form.Control>
              </Form.Group>

              

              

            <Button className='mt-3' type='submit' variant='success'>Update</Button>

          </Form>)}

          

         </FormContainer>
            
        </div>
    )
}

export default ProductEditScreen