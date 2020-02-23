import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../../styles/home.css'

export const HeaderWelcome = () => {

  const handleDiscover = (e) => {

  }

  return (
    <div className="header-welcome" style={{marginBottom:15, textAlign:'center',color:'white',height:'400px'}}>
      <LinkContainer to="/discover">
        <Button>Discover</Button>
      </LinkContainer>
      <LinkContainer to="/create">
        <Button>Start a Potluck</Button>
      </LinkContainer>
    </div>
  )
}
