import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { attemptSignup } from '../../store/auth'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { validateSignupData } from '../../utils/Validation'
import '../../styles/auth.css'


const emptySignupForm = {
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  name: "",
  city: "",
}

export const SignupUI = ({
  auth: {
    isAuth,
    loading,
    errors,
    isSignedUp
  },
  attemptSignup
}) => {
  const [formData, setFormData] = useState(emptySignupForm)
  const [formErrors, setFormErrors] = useState(null)
  const [formStep, setFormStep] = useState(0)

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

    // error checking
    let errors = validateSignupData(formData)

    if(errors)
      setFormErrors(errors)
    else {
      // submit form data
      attemptSignup(formData)
      resetForm()
    }
  }
  
  const resetForm = () => {
    setFormData(emptySignupForm)
    setFormStep(0)
  }

  const handleNext = () => setFormStep(formStep+1)
  const handlePrevious = () => setFormStep(formStep-1)

  const renderSignupForm = () => {
    if(formStep === 0)
      return ProfileForm()
    else
      return AuthForm()
  }

  const AuthForm = () => (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="auth-form-group" style={{marginTop:"1.2rem"}}>
        <Form.Control autoFocus name="email" onChange={handleChange} value={formData.email} type="email" placeholder="Email" />
      </Form.Group>
      <Form.Group className="auth-form-group" style={{marginTop:"1.2rem"}}>
        <Form.Control name="password" onChange={handleChange} value={formData.password} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="auth-form-group" style={{marginTop:"1.2rem"}}>
        <Form.Control name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} type="password" placeholder="Confirm Password" />
      </Form.Group>
      <div className="login-btn" style={{textAlign:'center'}}>
        <Button variant="light" onClick={handlePrevious} style={{marginRight:8}}>Back</Button>
        <Button type="submit" style={{marginLeft:8}}>Signup</Button>
      </div>
    </Form>
  )

  const ProfileForm = () => (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="auth-form-group" style={{marginTop:"1.2rem"}}>
        <Form.Control autoFocus name="name" onChange={handleChange} value={formData.name} placeholder="Name"  />
      </Form.Group>
      <Form.Group className="auth-form-group" style={{marginTop:"1.2rem"}}>
        <Form.Control name="city" onChange={handleChange} value={formData.city} placeholder="City" />
      </Form.Group>
      <Form.Group className="auth-form-group" style={{marginTop:"1.2rem"}}>
        <Form.Control name="phone" onChange={handleChange} value={formData.phone} placeholder="Phone Number" />
      </Form.Group>
      <div className="login-btn" style={{textAlign:'center'}}>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </Form>
  )
  
  if(isSignedUp)
    return <Redirect to="/login" />

  return (
    <Container fluid style={{position: 'relative'}}>
      <Row className="justify-content-md-center" style={{height: '100vh', background:"#fff"}}>
        <Col md="8" lg="6" xl="4" style={{display:'flex',alignItems:'center'}}>
          <section className="login-container"
            style={{display:'block', width:'100%', flex:1, padding:"3rem 1.5rem", border:'1px solid rgba(0,0,0,.1)'}}>
            <header className="auth-form-header" style={{textAlign:'center', marginBottom:'2.5rem'}}>
              <h1>Public Potluck</h1>
              <h5>Sign Up</h5>
            </header>

            {formErrors && (
              <div className="login-error-container" style={{textAlign:'center',color:'red',marginTop:'1rem',marginBottom:'.5rem'}}>
                <p className="login-error-text">{formErrors}</p>
              </div>
            )}

            {/* Render Form at current step */}
            {renderSignupForm()}
            
            <div className="signup-link-container" style={{textAlign:'center', marginTop:'1.2rem'}}>
              <Link to="/login">Already have an account? Login Here</Link>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export const Signup = connect(
  mapStateToProps,
  { attemptSignup }
)(SignupUI)