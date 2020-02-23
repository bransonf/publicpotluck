

import styled from 'styled-components'

export const SpinnerContainer = styled.div`

  position: relative;
  width: 100%;

  &.spinner-page-container {
    height: 100vh;
    max-height: 100vh;
  }

  .spinner-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const SpinnerSection = styled.section`

  position: relative;
  width: 100%;
  height: 100%;

  &.spinner-page-container {
    height: 100vh;
    max-height: 100vh;
  }

  .spinner-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .events-list {
    padding-left: 15px;
    padding-right: 6px;
    margin-top: 8px;
  }
`
