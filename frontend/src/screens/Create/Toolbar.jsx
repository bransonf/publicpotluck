import React from 'react'
import { Container } from 'react-bootstrap'
import { MdAddLocation, MdEdit } from 'react-icons/md'
import { GiKnifeFork } from 'react-icons/gi'
import { FaCameraRetro } from 'react-icons/fa'
import { StyledToolbar } from '../../styles/Layout.style'


export const Toolbar = ({
  formStep,
  setActiveStep
}) => {

  const handleToolbarClick = (e, params) => {
    e.preventDefault()

    console.log('clicked tab event:', e, 'params:', params)
    setActiveStep(params)
  }

  const regClass = "form-toolbar-link"
  const actClass = "form-toolbar-link active"

  // render a list of icons that can be clicked
  return (
    <StyledToolbar>
      <Container>
        <ul className="create-form-toolbar">
          {/* Event */}
          <li>
            <a id="orange" className={formStep===0 ? actClass : regClass} onClick={(e) => handleToolbarClick(e, 0)}>
              <GiKnifeFork />
              <span style={{marginLeft:6}}>Event</span>
            </a>
          </li>
          {/* Location */}
          <li>
            <a id="green" className={formStep===1 ? actClass : regClass} onClick={(e) => handleToolbarClick(e, 1)}>
              <MdAddLocation />
              <span style={{marginLeft:6}}>Location</span>
            </a>
          </li>
          {/* Details */}
          <li>
            <a id="blue" className={formStep===2 ? actClass : regClass} onClick={(e) => handleToolbarClick(e, 2)}>
              <MdEdit />
              <span style={{marginLeft:6}}>Extras</span>
            </a>
          </li>
          {/* Image */}
          <li>
            <a id="red" className={formStep===3 ? actClass : regClass} onClick={(e) => handleToolbarClick(e, 3)}>
              <FaCameraRetro />
              <span style={{marginLeft:6}}>Picture</span>
            </a>
          </li>
        </ul>
      </Container>
    </StyledToolbar>
  )
}
