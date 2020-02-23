

// source: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object#32108184
export const isObjectEmpty = obj => {
  if(Object.keys(obj).length === 0 && obj.constructor === Object)
    return true
    
  return false
}