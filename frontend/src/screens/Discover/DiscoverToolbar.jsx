import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import { addFilter, removeFilter, resetFilters, toggleFoodDesert }  from '../../store/events'
import { tags as allFilters } from '../../data/tags'
import { CircleButton } from '../../styles/Buttons.style'


const StyledToolbar = styled.div`
  padding: 15px;

  background: white;
  box-shadow: 5px 10px 30px rgba(0,0,0,.09);
  opacity: .75;
  color: #000;

  .toolbar-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tag-inputs {
      display: flex;
      align-items: center;
    }

    .map-rendering-inputs {
      display: flex;
      align-items: center;
    }
  }
`

export const DiscoverToolbarUI = ({
  filters,
  isFoodDesert,
  addFilter,
  removeFilter,
  resetFilters,
  toggleFoodDesert,
}) => {


  const handleFilterChange = (e) => {
    console.log('filter change event:', e, 'value:', e.target.value)
    if(e.target.value && allFilters.includes(e.target.value))
      addFilter(e.target.value)
  }
  const handleFilterClick = (e, filter) => {
    console.log('clicked filter with event:', e)
    removeFilter(filter)
  }

  const handleResetFilters = () => resetFilters()

  const handleCheckChange = (e) => {
    toggleFoodDesert()
  }

  return (
    <StyledToolbar>
      <Container fluid>
        <div className="toolbar-inner">
          {/* Section 1: Set Tag Filters */}
          <div className="tag-inputs">
            <select onChange={handleFilterChange}>
              {allFilters.map((filter, index) => (
                <option disabled={filters.includes(filter)} key={index}>
                  {filter}</option>
              ))}
            </select>

            <div style={{marginLeft:6,marginRight:6}}>filtering by tags: </div>
            
            {filters.length > 0 ? filters.map((filter, index) => (
              <CircleButton className="filter-tag-item active">
                <span key={index} onClick={(e) => handleFilterClick(e, filter)} style={{marginLeft:4,marginRight:4,padding:5}}>
                  {filter}</span>
              </CircleButton>
            )) : (
              <span style={{marginLeft:5}}>none</span>
            )}
          </div>

          {/* Section 2: Toggle Food Desert Render with Checkbox (and other toggles) */}
          <div className="map-rendering-inputs">
            <label style={{marginRight:6, marginBottom:0}}>view food deserts on map</label>
            <input type="checkbox" name="foodDesert" defaultChecked={isFoodDesert} onChange={handleCheckChange} />
          </div>
        </div>
      </Container>
    </StyledToolbar>
  )
}

const mapStateToProps = (state) => ({
  filters: state.events.filters,
  isFoodDesert: state.events.isFoodDesert
})

export const DiscoverToolbar = connect(
  mapStateToProps,
  { addFilter, removeFilter, resetFilters, toggleFoodDesert }
)(DiscoverToolbarUI)