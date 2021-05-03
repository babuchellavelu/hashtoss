const OPEN_MODAL ='OPEN_MODAL';
const CLOSE_MODAL ='CLOSE_MODAL';

export function openModal(payload) {
    return {
            type: OPEN_MODAL,
            payload
    }  

}

export function closeModal() {
    return {
        type: CLOSE_MODAL
    }
}

const intitialState = null;

export default function modalReducer(state= intitialState , {type, payload}){
    switch(type) {
        case OPEN_MODAL:
            const { modalType, modalProps} = payload;
            return { modalType, modalProps};
        case CLOSE_MODAL:
            return null;
        default: 
            return state;
    }
}