import React, { useState, useEffect } from 'react'
import { Navbar } from '../../components/layout/NavbarHome'
import { profileData } from '../../data/profile'
import { Container } from 'react-bootstrap'


export const Profile = ({
  match
}) => {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    let url = match.params.profileId
    console.log('params url:', url)
    setProfile(profileData)
  }, [])

  return (
    <div>
      <Navbar />
      <Container>
        {profile ? (
          <div style={{marginTop:20}}>
            <div style={{marginBottom:20, textAlign:'center'}}>name: {profile.name}</div>
            <div style={{marginBottom:20, textAlign:'center'}}>city: {profile.city}</div>
          </div>
        ) : (
          <div>
            profile loading...
          </div>
        )}
      </Container>
    </div>
  )
}
