import firebase from '../config/firebase';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
    if (!snapshot.exists) return undefined;
    const data=snapshot.data();

    for(const prop in data){
        if(data.hasOwnProperty(prop)){
            if(data[prop] instanceof firebase.firestore.Timestamp){
                data[prop] = data[prop].toDate();
            }
        }
    }

    return {
        ...data,
        id: snapshot.id
    }
}

//Events Data

export function listenToEventsFromFirestore(predicate){
    const user= firebase.auth().currentUser;
     let eventsRef= db.collection('events');
     switch(predicate.get('filter')){
         case 'isGoing':
             return eventsRef
             .where('attendeeIds' ,'array-contains',user.uid);
        case 'isHosting':
             return eventsRef
             .where('hostUid' ,'==',user.uid);
        default: 
            return eventsRef;  
     }

 }

/* Filter including Date */
// export function listenToEventsFromFirestore(predicate){
//     const user= firebase.auth().currentUser;
//      let eventsRef= db.collection('events').orderBy('date');
//      switch(predicate.get('filter')){
//          case 'isGoing':
//              return eventsRef
//              .where('attendeeIds' ,'array-contains',user.uid)
//              .where('date', '>=',predicate.get('startdate'));
//         case 'isHosting':
//              return eventsRef
//              .where('hostUid' ,'==',user.uid)
//              .where('date', '>=',predicate.get('startdate'));
//         default: 
//             return eventsRef
//              .where('date', '>=',predicate.get('startdate'));
//      }

//   }

 export function listenToEventFromFirestore(eventId) {
        return db.collection('events').doc(eventId);
 }

  export function addEventToFirestore(event) {
      const user = firebase.auth().currentUser;
        return db.collection('events').add({
            ...event,
            hostUid: user.uid,
            hostedBy:user.displayName,
            hostPhotoURL: user.photoURL || null,
              attendees: firebase.firestore.FieldValue.arrayUnion({
                id: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL|| null
              }),
              attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
        })
 }

   export function updateEventInFirestore(event) {
        return db.collection('events').doc(event.id).update(event);

 }

    export function deleteEventFromFirestore(eventId) {
        return db.collection('events').doc(eventId).delete();

 }

    export function cancelEventToggle(event) {
        return db.collection('events').doc(event.id).update({
            isCancelled : !event.isCancelled
        });

 }

 //User Profile

   export function setUserProfileData(user) {
        return db.collection('users').doc(user.uid).set({
          
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL || null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
                
              })
        }

export function getUserProfile(userId){
    return db.collection('users').doc(userId);

}

export async function updateUserProfile(profile){
    const user= firebase.auth().currentUser;
    try{

        if(user.displayName !== profile.displayName)
        {
            await user.updateProfile({
                displayName: profile.displayName
            })           
        } 
        return await db.collection('users').doc(user.uid).update(profile);
    }catch(error){
        throw error
    }
}

  export function addUserAttendance(event) {
      const user = firebase.auth().currentUser;
        return db.collection('events').doc(event.id).update({
              attendees: firebase.firestore.FieldValue.arrayUnion({
                id: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL|| null
              }),
              attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
        })
 }

   export async function cancelUserAttendance(event) {
      const user = firebase.auth().currentUser;
      try{
            const eventDoc = await db.collection('events').doc(event.id).get();
            return db.collection('events').doc(event.id).update({
                attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
                attendees: eventDoc.data().attendees.filter(attendee => attendee.id !== user.uid)
            })
      }catch(error){
            throw error
      }
  
 }

 /* Filter Profile Service from FireStore -- Start */

 export function getUserEventsQuery(activeTab,userUid){
     let eventsRef = db.collection('events');
     const today = new Date();

    switch(activeTab){
        case 1: 
        return eventsRef
        .where('attendeeIds','array-contains',userUid)
        .where('date','<=',today)
        .orderBy('date','desc');
    case 2:
        return eventsRef
        .where('hostUid','==',userUid)
        .orderBy('date')  ;
    default:
        return eventsRef
        .where('attendeeIds','array-contains',userUid)
        .orderBy('date','desc');
    }

 }
 