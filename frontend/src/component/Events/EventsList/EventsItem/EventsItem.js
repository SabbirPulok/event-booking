import React from 'react';
import './EventsItem.css';

const EventItem = props =>{
    return <li key={props.eventId} className="events_list__item">{props.title}</li>
}

export default EventItem;