

export const selectEventsForMap = (state) => {
  let events = state.events.events.filter(event => {
    if(event.coordinates[0] !== null && event.coordinates[1] !== null) {
      return {
        id: event._id,
        coordinates: event.coordinates,
        name: event.event_name
      }
    }
  })
  console.log('selected events:', events)

  return events;
}

export const selectEventsByFilter = (state) => {
  if(state.events.filters.length < 1)
    return state.events.events
  
  let filteredEvents = state.events.events.filter(event => {
    if(event.tags.length > 0) { 
      let showTag = false; // if true, will not return. if false, the flag is not raised, and the tag is good
      event.tags.forEach(tag => {
        if(state.events.filters.includes(tag))
          showTag=true;
      })
      if(showTag)
        return event;
    }
  })
  console.log('filteredEvents from selector:', filteredEvents)
  return filteredEvents
}