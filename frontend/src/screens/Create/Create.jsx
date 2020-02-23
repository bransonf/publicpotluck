import React, { useState } from 'react'
import { Navbar } from '../../components/layout/NavbarHome'
import axios from 'axios'
import { Header, Toolbar } from './index'
import { Container, Form, Button } from 'react-bootstrap'
import { ButtonGroup, CircleButton } from '../../styles/Buttons.style'
import { CreateSection } from '../../styles/Layout.style'
import { isObjectEmpty } from '../../utils/isObjectEmpty'


const emptyCreateForm = {
  // event section:
  event_name: "",
  event_desc: "",
  date_time: new Date(),
  duration: "00:00",
  // location section:
  city: "St. Louis",
  location_name: "",
  location_address: "",
  // extra details:
  max_attendees: "",
  leftovers: true,
  tags: [],
  price: "",
  fund_goal: "",
  // img: {},
  // approval: true, // last
}

const tags = [
  "gluten-free",
  "no dairy",
  "no nuts",
  "allergen-free",
  "vegan",
  "vegetarian",
  "halal",
  "env-friendly"
]

const BASE_URL = "http://api.publicpotluck.com"

export const Create = () => {
  const [formData, setFormData] = useState(emptyCreateForm)
  const [formStep, setFormStep] = useState(0) // how many steps? max: 4
  const [imageUpload, setImageUpload] = useState({})

  const handleChange = (e) => {
    if(e.target.name==="leftovers") {
      console.log("in leftovers change")
      setFormData({
        ...formData,
        leftovers: !formData.leftovers
      })
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleTagClick = (e, params) => {
    if(formData.tags.includes(params)) {
      // remove tag if already selected
      setFormData({
        ...formData,
        "tags": formData.tags.filter(tag => tag !== params)
      })
    }
    else {
      // add tag if not already selected
      setFormData({
        ...formData,
        "tags": [
          ...formData.tags,
          params
        ]
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // submit form data
    console.log('form data:', formData)
    setFormData({
      ...formData,
      date_time: new Date()
    })

  
    if(!isObjectEmpty(imageUpload)) {
      const imgPayload = new FormData()
      imgPayload.append("img", imageUpload)
      // post to api
      axios.post(BASE_URL + '/upload', imgPayload)
        .then(resData => {
          console.log('resData:', resData)
          console.log('res url:', resData.data.img_url)
          const payload = {
            ...formData,
            host_name: "Nico Stranquist",
            img_url: resData.data.img_url
          }
          axios.post(BASE_URL + '/create/event', JSON.stringify(payload), {
            headers: {
              "Content-Type": 'application/json'
            }
          })
            .then(res => {
              console.log('res:', res)
              resetForm()
            })
            .catch(err => console.log('err:', err))
        })
        .catch(err => console.log('error:', err))
    }
    else
      alert("tried to post empty img object")
  }
  
  const resetForm = () => {
    setFormData(emptyCreateForm)
    setFormStep(0)
    setImageUpload({})
  }

  const handleNext = (e) => {
    e.preventDefault()

    if(formStep < 3)
      setFormStep(formStep + 1)
    else
      handleSubmit(e)
  }

  const handlePrevious = (e) => {
    e.preventDefault()
    if(formStep > 0)
      setFormStep(formStep - 1)
    else setFormStep(0)
  }

  const handleImageChange = (e) => {
    console.log('files:', e.target.files[0])
    if(e.target.files[0]) {
      setImageUpload(e.target.files[0])
    }
  }

  const EventForm = () => (
    <Form onSubmit={handleNext}>
      <Form.Group>
        <Form.Label>Event Name</Form.Label>
        <Form.Control autoFocus name="event_name" onChange={handleChange} value={formData.event_name} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Describe Your Event</Form.Label>
        <Form.Control as="textarea" name="event_desc" onChange={handleChange} value={formData.event_desc} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" name="date_time" onChange={handleChange} value={formData.date_time} />
      </Form.Group>
      {/* Time, Duration */}
      <ButtonGroup>
        <Button type="submit" className="next-btn">Next</Button>
      </ButtonGroup>
    </Form> 
  )

  const LocationForm = () => (
    <Form onSubmit={handleNext}>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control autoFocus as="select" name="city" onChange={handleChange} value={formData.city}>
          <option>St. Louis</option>
          <option disabled>Kansas City</option>
          <option disabled>Jefferson City</option>
          <option disabled>Chicago</option>
          <option disabled>San Francisco</option>
          <option disabled>New York</option>
          <option disabled>Las Vegas</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Name of Location</Form.Label>
        <Form.Control name="location_name" onChange={handleChange} value={formData.location_name} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Address of Location</Form.Label>
        <Form.Control name="location_address" onChange={handleChange} value={formData.location_address} />
      </Form.Group>
      <ButtonGroup>
        <Button variant="light" className="back-btn" onClick={handlePrevious}>Back</Button>
        <Button type="submit" className="next-btn">Next</Button>
      </ButtonGroup>
    </Form>
  )

  const ExtrasForm = () => (
    <Form onSubmit={handleNext}>
      <Form.Group>
        <Form.Label style={{ marginRight: 10 }}>Will there be Leftovers?</Form.Label>
        <input type="checkbox" name="leftovers" onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Tags</Form.Label>
        <div className="tags-input-group">
          {tags.map((tag, index) => (
            <CircleButton key={index} className={formData.tags.includes(tag) ? "circle-button active" : "circle-button"} onClick={(e) => handleTagClick(e, tag)}>
              <span>{tag}</span>
            </CircleButton>
          ))}
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>Max Attendees</Form.Label>
        <Form.Control name="max_attendees" value={formData.max_attendees} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control name="price" value={formData.price} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Fundraising Goal</Form.Label>
        <Form.Control name="fund_goal" value={formData.fund_goal} onChange={handleChange} />
      </Form.Group>
      <ButtonGroup>
        <Button variant="light" className="back-btn" onClick={handlePrevious}>Back</Button>
        <Button type="submit" className="next-btn">Next</Button>
      </ButtonGroup>
    </Form>
  )

  const ImageForm = () => (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Image Upload</Form.Label>
        <div>
          <input type="file" accept="image/*;capture=camera" name="img" onChange={handleImageChange} />
        </div>
      </Form.Group>
      <ButtonGroup>
        <Button variant="light" className="back-btn" onClick={handlePrevious}>Back</Button>
        <Button type="submit" className="next-btn">Create Event</Button>
      </ButtonGroup>
    </Form>
  )

  const renderFormSection = () => {
    if(formStep===0)
      return EventForm()
    else if(formStep===1)
      return LocationForm()
    else if(formStep===2)
      return ExtrasForm()
    else if(formStep===3)
      return ImageForm()
  }

  return (
    <div>
      {/* TODO: Create different navbar */}
      <Navbar />
      <Toolbar
        formStep={formStep}
        setActiveStep={setFormStep}
      />
      <Container>
        <Header formStep={formStep} />

        <CreateSection className="create-section">
          {renderFormSection()}
        </CreateSection>
      </Container>
    </div>
  )
}
