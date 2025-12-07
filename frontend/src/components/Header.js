import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Button from 'react-bootstrap/Button';
//import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
//import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import '../index.css';
import './navbar.css'
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/userActions';
//import SearchBox from './SearchBox';
import { useHistory } from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
//import {GrFormSearch} from 'react-icons/gr'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';





import NavDropdown from 'react-bootstrap/NavDropdown';

const Header=()=> {

  const [keyword,setKeyword]=useState('')
  let history=useHistory()


  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    console.log("Logout")
    dispatch(logout())
  }


  const submitHandler=(e)=>{
    e.preventDefault()
    if (keyword){
      history.push(`/?keyword=${keyword}&page=1`)
    }else{
      history.push(history.location.pathname)
    }
}


const [showMediaIcons, setShowMediaIcons] = useState(false);
const [showProfileIcons] = useState(false);





  return (
    // <Navbar bg="dark" variant='dark'  id="navbarScroll" collapseOnSelect>
     
      <nav className="main-nav" 
            // style={{ maxHeight: '100px' }} 
          >   
          
        <div className='logo'><ul>

        
          
        
        <Link to="/" ><img src="./images/logo.jpg" alt=""></img></Link></ul>  
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
        </div>    
        

        
       
        
        
        
          <div className={showMediaIcons?"search-bar mobile-search-bar":"search-bar"}> 
          <ul><li>
          <Form className="d-flex justify-content-center" onSubmit={submitHandler}>
            <Form.Control
              // style={{background:"blanchedalmond"}}
              // style={{width:"370px"}}
              
              type="text"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setKeyword(e.target.value)} 
            />
            <Button type='submit' variant="outline-success"><i className="fa fa-search"></i></Button>
          </Form></li>
              {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
        {/* </ul>
      </div>  */}

          
        {/* <div className={showProfileIcons?"profile-cart mobile-profile-cart":"profile-cart"}>
          <ul> */}

          
          <li><div className='cartprofile'><span>
            <Link to="/cart" ><i className='fas fa-shopping-cart ' style={{color: 'white'}}></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          {/* &nbsp;&nbsp;&nbsp; */}
          {/* </li> */}
          
        
          




            {/* <li> */}
              {userInfo?(
                      <NavDropdown style={{color: 'white'}} title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>):(
                                <LinkContainer to="/login">
                                 <Nav.Link><i className="fas fa-user" style={{color: 'white'}}></i></Nav.Link>
                                </LinkContainer>)

            }
            {/* </li> */}

            
              {userInfo && userInfo.isAdmin && (
              <NavDropdown style={{color: 'white'}} title='Admin' id='adminmenu'>
                          <LinkContainer to='/admin/userlist'>
                              <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to='/admin/productlist'>
                              <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to='/admin/orderlist'>
                              <NavDropdown.Item>Order</NavDropdown.Item>
                          </LinkContainer>

                      </NavDropdown>)}</div></li>
                      </ul>
      </div> 
                 <div className={showProfileIcons?"profile-cart mobile-profile-cart":"profile-cart"}>
                      <div className="hamburger-menu">
                       <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
                       <GiHamburgerMenu style={{color: 'white'}}></GiHamburgerMenu></a></div>


                       {/* <div className='profile-icon'>
                          <a href="#" onClick={() => setShowProfileIcons(!showProfileIcons)}>
                        <GiHamburgerMenu></GiHamburgerMenu></a>  */}

                      </div> 

                        
                       


          
            
            



                      
          {/* </div> */}
        
           
        </nav>
          
  
     

    // </Navbar>
    
    
  );
}

export default Header;