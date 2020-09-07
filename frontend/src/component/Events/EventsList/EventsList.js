import React from 'react';
import './EventsList.css';
import EventItem from './EventsItem/EventsItem';

const EventsList = props => {
    const events = props.events.map(event => {
        return <EventItem eventId={event._id} title={event.title}></EventItem>
    });
    return(
        <ul className="events_list">{events}</ul>
        )};

export default EventsList;