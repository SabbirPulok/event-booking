import React, {Component}  from 'react';
import './Events.css';
import Modal from '../component/Modal/Modal';
import Backdrop from '../component/Backdrop/Backdrop';

class EventsPage extends Component{
        state ={
            creating: false
        }
        openCreateEventHandle = () =>{
            this.setState({creating:true})
        };
        modalConfirmHandler = () =>{    
            this.setState({creating:false})
        };
        modalCancelHandler = () =>{
            this.setState({creating:false})
        };
    render(){
        return (
            <>
                { this.state.creating && <Backdrop />}
                {this.state.creating && <Modal title="Add Event" 
                    canCancel canConfirm 
                    onConfirm={this.modalConfirmHandler} onCancel={this.modalCancelHandler}>
                    
                    <p>Modallala</p>
                </Modal>}
                <div className="events-control">
                    <p>Share your events with us!</p>
                    <button className="btn" onClick={this.openCreateEventHandle}>Create Event</button>
                </div>
            </>            
        );
    }
}

export default EventsPage;
