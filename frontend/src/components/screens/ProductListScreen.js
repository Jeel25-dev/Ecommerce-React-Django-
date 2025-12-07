import React,{useEffect} from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {Table,Row,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Paginate from "../Paginate";
import Button from 'react-bootstrap/Button';
import { listProducts,deleteProduct,createProduct} from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";

function ProductListScreen({history,match}) {



    const dispatch=useDispatch()


    const productList = useSelector(state=>state.productList)
    const {loading,products,error,pages,page}=productList

    const productDelete = useSelector(state=>state.productDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete}=productDelete

    const productCreate = useSelector(state=>state.productCreate)
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct}=productCreate



    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

   


    let keyword=history.location.search

    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})

        if (!userInfo.isAdmin){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts(keyword))
        }


        
        
    },[dispatch,history,userInfo,keyword,successDelete,successCreate,createdProduct])




    const deleteHandler = (id) =>{

        if (window.confirm('Are You Sure')){
            dispatch(deleteProduct(id))
        }
       
        
       
    }

    const createProductHandler = () =>{
        dispatch(createProduct())

        
        
       
    }





  return (
    <div>
        <h1 style={{color: "white"}}>gtffh</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h1 style={{color: "white"}}>fhhf</h1>
 <h5 style={{color: "white"}}>fhhf</h5>
  <Link to='/' className='btn btn-light my-3'> Go Back</Link>


        <Row className="align-items-center">
            <Col>
                <h1>Products</h1>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>

            <Col className="text-right">
                <Button className="my-3" onClick={createProductHandler}>
                    <i className="fa fa-plus"></i>  Create Product
                </Button>
            </Col>
        </Row>


        {loadingDelete && <Loader></Loader>}
        {errorDelete && <div class="alert alert-danger" role="alert">{errorDelete}</div>}



        {loadingCreate && <Loader></Loader>}
        {errorCreate && <div class="alert alert-danger" role="alert">{errorCreate}</div>}




        {loading ? <Loader></Loader>
          : error ? <div class="alert alert-danger" role="alert">{error}</div>
            : (
                <div>
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                     <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                     </tr>
                    </thead>


                    <tbody>
                        {products.map(product=>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'><i className="fas fa-edit"></i></Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}><i className="fas fa-trash"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
                <Paginate pages={pages} page={page} isAdmin={true}></Paginate> 
                </div>
            )}
            


    </div>
  )
}

export default ProductListScreen