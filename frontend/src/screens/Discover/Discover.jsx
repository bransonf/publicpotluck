import React, { useEffect } from 'react'
import styled from 'styled-components'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { Container, Card, Spinner } from 'react-bootstrap'
import { Navbar } from '../../components/layout/NavbarHome'
import { Row, Col } from 'react-bootstrap'
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../store/events'
import { MapboxMap } from '../../components/Map'
import { selectEventsForMap, selectEventsByFilter } from '../../store/selectors'
import { SpinnerSection } from '../../styles/Spinner.style'
import { DiscoverToolbar } from './DiscoverToolbar'


const EventCard = styled(Card)`
  margin-bottom: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 120;
  border-radius:8px;

  .image-left {
    margin: 1px auto;
    min-width: 110px;
    text-align: center;

    .event-card-image {
      border-radius: 8px;
      max-height: 110px;
      max-width: 110px;
      height: 110px;
      width: auto;
      margin: 0 auto;
    }
  }

  .content-body {
    margin-left: 12px;
    flex: 1;
    flex-grow: 1;
  }


  .img-fluid {
    max-height: 100%;
    width: auto;
  }

  h3.event-card-title {
    padding-top: 15px;
    padding-bottom: 15px;
    cursor: pointer;
    font-size: 1.6rem;

    &:hover {
      text-decoration: underline;
    }
  }
`

export const DiscoverUI = ({
  events,
  isFoodDesert,
  loading,
  errors,
  mapEvents,
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
}) => {

  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    // do something to toggle the food desert coordinates on mapbox
    
  }, [isFoodDesert])

  return (
    <div>
      <Navbar />
      <DiscoverToolbar />
      <Container fluid>
        <Row style={{maxHeight:"calc(100vh - 60px)"}}>
          {/* Events List */}
          <Col md="5" style={{maxHeight:"calc(100vh - 60px)", paddingRight:0,paddingLeft:0}}>
            <SpinnerSection className="events-list-container" style={{maxHeight:"calc(100vh - 60px)", overflow:'auto'}}>
              {loading ? (
                <div className="spinner-container">
                  {/* Position Absolute */}
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              ) : !errors ? (
                <ul className="events-list">
                  {events.length > 0 ? events.map((event, index) => {
                    // TODO: make its own component
                    return (
                      <EventCard key={index}>
                        <div className="image-left">
                          <img className="event-card-image" src={event.img_url} alt="(no image)" />
                        </div>
                        <div className="content-body">
                          <LinkContainer to={`/events/${event._id}`}>
                            <h3 className="event-card-title">{event.event_name}</h3>
                          </LinkContainer>
                          <p>{event.event_description!=="" && event.event_description}</p>
                        </div>
                      </EventCard>
                    )
                  }) : (
                    <div>
                      <p>There are no events yet!</p>
                    </div>
                  )}
                </ul>
              ) : (
                <div>
                  <p className="error-text">There was an error.</p>
                </div>
              )}
            </SpinnerSection>
          </Col>
          {/* Event Map */}
          {/* todo: on mobile screen, pull up */}
          <Col md="7" style={{paddingRight:0,paddingLeft:0}}>
            <MapboxMap events={mapEvents} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  events: selectEventsByFilter(state),
  isFoodDesert: state.events.isFoodDesert,
  loading: state.events.loading,
  errors: state.events.errors,
  mapEvents: selectEventsForMap(state)
})

export const Discover = connect(
  mapStateToProps,
  { getEvents, addEvent, updateEvent, deleteEvent }
)(DiscoverUI)