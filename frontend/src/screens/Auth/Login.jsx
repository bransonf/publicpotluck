import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import { attemptLogin } from '../../store/auth'
import '../../styles/auth.css'
// import axios from 'axios'
import { ButtonGroup } from '../../styles/Buttons.style'


const emptyLoginForm = {
  email: "",
  password: "",
}

export const LoginUI = ({
  auth: {
    isAuth,
    loading,
    errors,
    isSignedUp,
  },
  attemptLogin
}) => {
  const [formData, setFormData] = useState(emptyLoginForm)

  useEffect(() => {
    return () => resetForm()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const loginFormData = new FormData()
    loginFormData.set("email", formData.email)
    loginFormData.set("password", formData.password)


    attemptLogin(formData.email, formData.password)
    
    resetForm()
  }
  
  const resetForm = () => setFormData(emptyLoginForm)
  
  if(isSignedUp) {
    alert("you have signed up successfully!")
  }

  return (
    <Container style={{position: 'relative'}} fluid>
      <Row className="justify-content-md-center" style={{height: '100vh', background:"#fff"}}>
        <Col md="8" lg="6" xl="4" style={{display:'flex',alignItems:'center'}}>
          <section className="login-container" 
            style={{display:'block', width:'100%', flex:1, padding:"3rem 1.5rem", border:'1px solid rgba(0,0,0,.1)'}}>
            <header className="auth-form-header" style={{textAlign:'center', marginBottom:'2.5rem'}}>
              <h1>Public Potluck</h1>
              <h5>Sign In</h5>
            </header>

            {/* Errors from redux */}
            {errors && (
              <div className="login-error-container" style={{textAlign:'center',color:'red',marginTop:'1rem',marginBottom:'.5rem'}}>
                <p className="login-error-text">{errors}</p>
              </div>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="auth-form-group" style={{marginTop:"1.2rem"}}>
                <Form.Control autoFocus name="email" onChange={handleChange} value={formData.email} type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group className="auth-form-group" style={{marginTop:"1.2rem"}}>
                <Form.Control name="password" onChange={handleChange} value={formData.password} type="password" placeholder="Password" />
              </Form.Group>
              <div className="login-btn" style={{textAlign:'center', marginTop:"1.5rem"}}>
                <Button type="submit">Login</Button>
              </div>
            </Form>
            <ButtonGroup>
              <Link to="/signup">Don't have an account? Signup Here</Link>
            </ButtonGroup>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export const Login = connect(
  mapStateToProps,
  { attemptLogin }
)(LoginUI)


// old api code:

    // create request object
    // const request = new Request("http://api.publicpotluck.com/login", {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   body: loginFormData,
    //   headers: new Headers({
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }),
    //   credentials: "include"
    // });

    // // submit form data
    // // attemptLogin(formData.email, formData.password)
    // fetch(request)
    //   .then((data) => {
    //     console.log('success! data:', data)
    //     // console.log('success! json:', data.json())
    //   })
    //   .catch(err => {
    //     console.log('error:', err)
    //   })



    // const transport = axios.create({
    //   withCredentials: true,
    // })
    // axios.defaults.withCredentials = true

    // axios.post("http://api.publicpotluck.com/login", loginFormData, {
    //   withCredentials: true,
    //   headers: {
    //     // "Content-Type": "application/x-www-form-urlencoded",
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    // fetch("http://api.publicpotluck.com/login", {
    //   method: 'post',
    //   body: loginFormData
    // })
    //   .then(res => {
    //     console.log('response:', res)
    //     console.log('response body:', res.body.usercookie)
    //   })
    //   .catch(function (error) {
    //     console.log('error', error);
    //   });

      // axios({
      //   method: 'post',
      //   url: '"http://api.publicpotluck.com/login"',
      //   data: loginFormData,
      //   withCredentials: true
      // })
      // .then(res => {
      //       console.log('response:', res)
      //     })
      //     .catch(function (error) {
      //       console.log('error', error);
      //     });