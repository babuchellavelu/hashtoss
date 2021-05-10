import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
import firebase from '../../app/config/firebase';
import { asyncAppLoaded } from "../../app/async/asyncReducer";
import { dataFromSnapshot, getUserProfile } from "../../app/firestore/firestoreService";
import { listenToCurrentUserProfile } from "../profiles/profilePage/profileActions";


export function signInUser(user) {
    
        return {
            type: SIGN_IN_USER,
            payload: user
        }
}

export function signOutUser() {
    return {
        type: SIGN_OUT_USER
    }
}

export function verifyAuth() {
    return function (dispatch) {
        return firebase.auth().onAuthStateChanged(user => {
            if(user){
                dispatch(signInUser(user));
                const profileRef =getUserProfile(user.uid);
                profileRef.onSnapshot(snapshot => {
                    dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
                    dispatch(asyncAppLoaded())
                })
                
            }else {
                dispatch(signOutUser())
                 dispatch(asyncAppLoaded())
            }
        })
    }
}
