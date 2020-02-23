import { isObjectEmpty } from './isObjectEmpty'

export const validateSignupData = signupData => {
  // error check, if error, return string, else return null
  if(isObjectEmpty(signupData))
    return "please fill out the signup form"

  const {email, phone, password, confirmPassword, name, city} = signupData

  if(name === "" || phone === "" || password==="" || confirmPassword==="" || name==="" || city==="")
    return "one or more of your fields are empty"
  
  if(!validatePhoneNumber(phone))
    return 'phone number did not match'

  if(password !== confirmPassword)
    return 'passwords must match'

  return null
}


// credits: https://stackoverflow.com/questions/18375929/validate-phone-number-using-javascript
function validatePhoneNumber(phoneNumber) {
  var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(phoneNumber.match(phoneRegex))
    return true;

  return false;
}
