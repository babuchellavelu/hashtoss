import React from 'react';
import { Container, Menu , Button} from 'semantic-ui-react';

export default function NavBar({setFormOpen}) {
    return (
            <Menu  fixed='top' inverted>
                <Container>
                    <Menu.Item header>
                        <img src='/assets/logo.png'  style={{marginRight:15}} className='imgcls'/>
                         Re-vents
                    </Menu.Item>
                    <Menu.Item name="Events" />
                    <Menu.Item >
                        <Button onClick={() => setFormOpen(true)} positive inverted content='Create Events'/>
                    </Menu.Item>

                    <Menu.Item position='right'>
                        <Button basic inverted content='Login'/>
                        <Button basic inverted content='Register' style={{marginLeft:'0,5em'}}/>
                    </Menu.Item>

                </Container>

            </Menu>
    )
}