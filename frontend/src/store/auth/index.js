

// auth types
const SET_USER = 'SET_USER'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_ERROR = 'SIGNUP_ERROR'
const SET_AUTH_LOADING = 'SET_AUTH_LOADING'
const LOGOUT = 'LOGOUT'


// auth action creators and redux actions
export const attemptLogin = (email, password) => (dispatch) => {
  console.log('attempting login')
  // call api with the email and password
  
  // if response received is ok (200?) then dispatch authenticate

  dispatch({
    type: SET_USER,
    user: {
      email,
      password
    }
  })
  // else dispatch set_error



  // FOR TESTING ONLY:
  dispatch({ type: LOGIN_SUCCESS })
}

export const attemptSignup = (email, password, name, phone, city) => (dispatch) => {
  console.log('attempting signup')
  // call api with signup data
  
  // if response received is ok (200?) then redirect to login with success message
    // do this with 'SIGNUP_SUCCESS'

  // else dispatch set_error (received from server)


  // FOR TESTING ONLY:
  dispatch({ type: SIGNUP_SUCCESS })
}

export const logout = () => {
  return {
    type: LOGOUT,
  }
}


// auth reducer
const initialState = {
  isAuth: false,
  loading: false,
  errors: null,
  isSignedUp: false,
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        errors: null
      }
    case LOGIN_ERROR:
      return {
        ...state,
        isAuth: false, // to be sure
        loading: false,
        errors: action.error
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSignedUp: true,
        isAuth: false,
        loading: false,
        errors: null,
      }
    case SIGNUP_ERROR:
      return {
        ...state,
        isSignedUp: false, // to be sure
        loading: false,
        errors: action.error
      }
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      }
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
      }
    default:
      return state;
  }
}
