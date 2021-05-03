import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

const initialState = {
    authendicated: true,
    currentUser: {
        email: 'babu@gmail.com',
        photoURL: '/assets/user.png'
    }
}

export default function authReducer(state = initialState, {type, payload}){
    switch(type){
        case SIGN_IN_USER:
           return {
               ...state,
               authendicated: true,
               currentUser: {
                   email: payload.email,
                   photoURL: '/assets/user.png'
               }
           } 
        case SIGN_OUT_USER:
           return {
               ...state,
               authendicated: false,
               currentUser: null
           } 
           default:
               return state;
    }

}