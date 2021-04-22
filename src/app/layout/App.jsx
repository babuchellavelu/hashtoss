import React, {useState}  from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/eventDashboard';
import NavBar from '../../features/nav/NavBar';

function App() {

    const [formOpen,setFormOpen] =useState(false);
  /*Below is the no JSX code for the below code using react.createElement */
 // const title = React.createElement('h1',{}, 'Revents No JSX');
 // const div = React.createElement('div', {className:'App'}, title);

  return (
     <>
       <NavBar setFormOpen={setFormOpen}/>
      <Container className='main'>
        <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen}/>
      </Container>
            
     </>

  );
}

export default App;
