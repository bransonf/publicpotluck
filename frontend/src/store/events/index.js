import axios from 'axios'


// Event action types
const SET_EVENTS = 'SET_EVENTS'
const ADD_EVENT = 'ADD_EVENT'
const UPDATE_EVENT = 'UPDATE_EVENT'
const DELETE_EVENT = 'DELETE_EVENT'
// Filter action types
const ADD_FILTER = 'ADD_FILTER'
const REMOVE_FILTER = 'REMOVE_FILTER'
const RESET_FILTERS = 'RESET_FILTERS'
const TOGGLE_FOOD_DESERT = 'TOGGLE_FOOD_DESERT'
// Status action types
const SET_LOADING = 'SET_LOADING'
const SET_ERROR = 'SET_ERROR'

const BASE_URL = "http://api.publicpotluck.com"

// Events actions
export const getEvents = () => dispatch => {
  // call api, then dispatch events to redux
  dispatch({ type: SET_LOADING })
  axios.get(BASE_URL + '/events?city=St. Louis')
    .then(res => {
      console.log('response:', res, 'res.data:', res.data)
      dispatch({ type: SET_EVENTS, events: res.data })
    })
    .catch(err => {
      console.log('error:', err)
      dispatch({ type: SET_ERROR, err })
    })
}

export const addEvent = (eventData) => (dispatch) => {
  console.log("called addEvent with data:", eventData)
  //axios.post(BASE_URL + '/create/event')
  //  .then(res => {
  //    console.log('res:', res)
  //    dispatch({ type: ADD_EVENT, event: res.data.json().event})
  //  })
  //  .catch(err => {
  //    console.log('error:', err)
  //  })
}
export const updateEvent = (eventData) => (dispatch) => {
  console.log('called updateEvent with data:', eventData)
}
export const deleteEvent = (id) => (dispatch) => {
  console.log('called deleteEvent with id:', id)
  //axios.delete(BASE_URL + '/delete/event').then((res) => {}).catch(err => {})
}

export const addFilter = (tag) => {
  return {
    type: ADD_FILTER,
    tag
  }
}
export const removeFilter = (tag) => {
  return {
    type: REMOVE_FILTER,
    tag
  }
}
export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  }
}
export const toggleFoodDesert = () => {
  return {
    type: TOGGLE_FOOD_DESERT
  }
}


// Events reducer
const initialState = {
  events: [],
  filters: [],
  isFoodDesert: false,
  loading: false,
  errors: null
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    case SET_EVENTS:
      console.log('action.events:', action.events)
      return {
        ...state,
        events: action.events,
        loading: false,
        errors: null
      }
    case ADD_EVENT:
      return {
        ...state,
        events: [
          ...state.events,
          action.event
        ],
        errors: null,
      }
    case UPDATE_EVENT:
      const newEvents = state.events.events.map(event => {
        if(event.id === action.event.id) {
          event = action.event
        }
        return event
      })
      return {
        ...state,
        events: newEvents,
        errors: null
      }
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.id),
        errors: null
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case SET_ERROR:
      return {
        ...state,
        errors: action.err,
        loading: false
      }
    case ADD_FILTER:
      if(!state.filters.includes(action.tag)) {
        return {
          ...state,
          filters: [
            ...state.filters,
            action.tag
          ]
        }
      }
      else return state
    case REMOVE_FILTER:
      return {
        ...state,
        filters: state.filters.filter(filter => filter !== action.tag)
      }
    case RESET_FILTERS:
      return {
        ...state,
        filters: []
      }
    case TOGGLE_FOOD_DESERT:
      return {
        ...state,
        isFoodDesert: !state.isFoodDesert,
      }
    default:
      return state;
  }
}