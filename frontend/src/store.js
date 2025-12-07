import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer,productDetailsReducer,productDeleteReducer,productCreateReducer,productUpdateReducer,productReviewCreateReducer,} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducers } from './reducers/userReducers'; 
import { userRegisterReducers } from './reducers/userReducers';
import { userDetailsReducers,userUpdateProfileReducers,userListReducers,userDeleteReducers,userUpdateReducers } from './reducers/userReducers';
import { orderCreateReducers,orderDetailsReducers,orderPayReducers,orderDeliverReducers,orderListMyReducers,orderListReducers } from './reducers/orderReducers';


const reducer =combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    prouctUpdate:productUpdateReducer,
    productReviewCreate:productReviewCreateReducer,

    cart:cartReducer,
    userLogin:userLoginReducers,
    userRegister:userRegisterReducers,
    userDetails:userDetailsReducers,
    userUpdateProfile:userUpdateProfileReducers,
    userList:userListReducers,
    userUpdate:userUpdateReducers,
    userDelete:userDeleteReducers,
    
    orderCreate:orderCreateReducers,
    orderDetails:orderDetailsReducers,
    orderPay:orderPayReducers,
    orderDeliver:orderDeliverReducers,
    orderListMy:orderListMyReducers,
    orderList:orderListReducers,  
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems')?
 JSON.parse(localStorage.getItem('cartItems')): []

const userInfoFromStorage = localStorage.getItem('userInfo')?
 JSON.parse(localStorage.getItem('userInfo')): null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
 JSON.parse(localStorage.getItem('shippingAddress')): {}



const initailState = {
     cart:{cartItems:cartItemsFromStorage,shippingAddress:shippingAddressFromStorage},
     userLogin:{userInfo:userInfoFromStorage}
}

const middleware=[thunk]
const store = createStore(reducer,initailState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;