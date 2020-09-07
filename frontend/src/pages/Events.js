import React, {Component}  from 'react';
import {Link} from 'react-router-dom';
import './Events.css';
import Modal from '../component/Modal/Modal';
import Backdrop from '../component/Backdrop/Backdrop';
import AuthContext from '../component/Context/authContext';
import EventsList from '../component/Events/EventsList/EventsList';
class EventsPage extends Component{
        state ={
            creating: false,
            events: []
        }
        constructor(props){
            super(props);
            this.titleElRef = React.createRef();
            this.priceElRef = React.createRef();
            this.dateElRef = React.createRef();
            this.descriptionElRef = React.createRef();
        }
        static contextType = AuthContext;

        componentDidMount()
        {
            this.fetchEventHandler();
        }
        openCreateEventHandle = () =>{
            this.setState({creating:true})
        };
        modalConfirmHandler = () =>{    
            this.setState({creating:false})
            const title = this.titleElRef.current.value;
            const price = +this.priceElRef.current.value;
            const date = this.dateElRef.current.value;
            const description = this.descriptionElRef.current.value;

            if(title.trim().length===0 || price<0 || date.trim().length===0 || description.trim().length===0)
            {
                return;
            }
            const event = {title,price,date,description};
            console.log(event);

            const requestBody = {
                query:`
                  mutation{
                    createEvent(eventInput: {title : "${title}", description : "${description}", price: ${price}, date:"${date}"}){
                      _id
                      title
                      description
                      price
                      date
                      creator{
                          _id
                          email
                      }
                    }
                  }
                `
              }
              
              const token = this.context.token;

              fetch('http://localhost:4000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+ token
                }
              })
              .then(res=>{
                if(res.status !== 200 & res.status!== 201){
                  throw new Error("Failed!");
                }
                return res.json();
              })
              .then(result=>{
                this.fetchEventHandler();
              })
              .catch(err=>{
                console.log(err);
              });
        };

        modalCancelHandler = () =>{
            this.setState({creating:false})
        };

        fetchEventHandler =()=>{
            
            const requestBody = {
                query:`
                    query{
                        events{
                            _id
                            title
                            description
                            price
                            date
                            creator{
                                _id
                                email
                            }
                        }
                    }
                `
              }
              
              fetch('http://localhost:4000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(res=>{
                if(res.status !== 200 & res.status!== 201){
                  throw new Error("Failed!");
                }
                return res.json();
              })
              .then(result=>{
                const events = result.data.events;
                this.setState({events:events});
              })
              .catch(err=>{
                console.log(err);
              });
        }
    render(){
        return (
            <>
                { this.state.creating && <Backdrop />}
                {this.state.creating && <Modal title="Add Event" 
                    canCancel canConfirm 
                    onConfirm={this.modalConfirmHandler} onCancel={this.modalCancelHandler}>
                    
                    <form>
                        <div className="form-control">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id="title" ref={this.titleElRef}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="price">Price</label>
                            <input type="number" name="price" id="price" min="0" ref={this.priceElRef}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="date">Date</label>
                            <input type="date" name="date" id="date" ref={this.dateElRef}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" cols="50" rows="5" ref={this.descriptionElRef}></textarea>
                        </div>
                    </form>
                </Modal>}
                {
                    this.context.token ? 
                    <div className="events-control">
                        <p>Share your events with us!</p>
                        <button className="btn" onClick={this.openCreateEventHandle}>Create Event</button>
                    </div>
                    :
                        <div className="events-control">
                            <p>Share your events with us!</p>
                            <Link to="/auth"><button className="btn">Please login for creating Event</button></Link>
                        </div>
                }
            
                <EventsList events={this.state.events}></EventsList>
                
            </>            
        );
    }
}

export default EventsPage;
