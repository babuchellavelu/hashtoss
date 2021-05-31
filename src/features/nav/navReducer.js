import { FETCH_MENU } from '../nav/navConstants';


const initialState = {
    menu: []
}

export default function menuReducer(state = initialState, {type, payload}){
    switch(type){
           case FETCH_MENU:
               return{
                   ...state,
                   menu: payload

               }
           default:
               return state;
    }

}