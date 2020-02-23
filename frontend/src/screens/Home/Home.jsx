import React from 'react'
import { HeaderWelcome } from './index'
import { Navbar } from '../../components/layout/NavbarHome'
import { Container, Row, Col } from 'react-bootstrap'

export const Home = () => {
  return (
    <div className="home-page">
      {/* Will render navbar in each component, because its contents may change per route */}
      <Navbar />

      <HeaderWelcome />
      
      <section className="home-section">
        <h1>We're On A Mission</h1>
        <h2>To Bring People Together Around Food</h2>
        <img src="https://storage.googleapis.com/publicpotluck/UaQzWNXXmeCgcaDxOzymxzEcWVVrab..jpg" alt="a welcome image from potluck" className="img-fluid"/>
      </section>
      <section className="call-out right">
        <h2>Healthy Cooked Meals and Great Company</h2>
        <h3>Do Good For The Body and The Mind</h3>
        <img src="https://storage.googleapis.com/publicpotluck/lLFtlEInFrdqwIwjTCldhLzOARTJfl..jpg" alt="a welcome image from potluck" className="img-fluid"/>
      </section>
      <section className="call-out">
        <h2>Everyone Should Have Access to a Nice Meal</h2>
        <h3>Even Those Without Access to Healthy Foods</h3>
        <img src="https://storage.googleapis.com/publicpotluck/BSmmICQSeciRqCDAmTzIlJMXuftKkh..jpg" alt="a welcome image from potluck" className="img-fluid"/>
      </section>
      <section className="call-out right">
        <h2>Reduce Waste</h2>
        <h3>Don't Let Anything Go to Waste, Offer Your Leftovers to The Community</h3>
        <img src="https://storage.googleapis.com/publicpotluck/VbRyUCMWMTchKfndYluwPREhsklkML..jpg" alt="a welcome image from potluck" className="img-fluid"/>
      </section>
      <section className="call-out">
        <h2>Connect on Campus</h2>
        <h3>Chow Down With Other Students, Maybe Try Something New</h3>
        <img src="https://storage.googleapis.com/publicpotluck/DPmCRBVpHJEYOWTwfTIOJnQvLIBqLr..jpg" alt="a welcome image from potluck" className="img-fluid"/>
      </section>
      <section className="call-out center">
        <h2>Make A Difference</h2>
        <h5>We were inspired by Champale Anderson, who gives out more than a hundred lunches a day to children who live in her community. We should all strive to be more like Ms. Anderson.</h5>
        <iframe width='640' height='480' frameborder='0' allowfullscreen src='//cdn2.trb.tv/iframe.html?ec=JnaGhnaTE6NQ2Agy2sGxMwVvgImOw5y2&pbid=c660b791c3704ff69d4162d7adb7c4a1&pcode=d2b3E6s5rDofer9uw9hhgMxCRs6U'></iframe>
      </section>
      <div className="ani"></div>
      <footer>
        <h5>
          Made with &hearts; for UMSL|HACK 2020 
          <br/>
          Nico Stranquist and Branson Fox 
        </h5>
      </footer>
    </div>
  )
}
