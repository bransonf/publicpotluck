import styled from 'styled-components'

export const CreateSection = styled.section`
  margin-left: 16.65%;
  margin-right: 16.65%;
  margin-bottom: 20px;

  @media (max-width: 800px) { 
    margin-left: 10px;
    margin-right: 10px;

    .circle-button {
      margin-bottom: 10px;
    }
  }
`

export const StyledHeader = styled.header`
  text-align: center;
  padding: 3rem 1.5rem;
  margin-bottom: 1rem;
  font-family: sans-serif;
  margin-left: 16.65%;
  margin-right: 16.65%;

  .header-title {
    font-color: rgba(0,0,0,.75);
    margin-bottom: 1.5rem;
  }

  .header-description {
    font-color: rgba(0,0,0,.6);
    font-size: 1.05rem;
  }

  @media (max-width: 800px) {
    margin-left: initial;
    margin-right: initial;
  }
`

export const StyledToolbar = styled.div`
  overflow-x: auto;

  .create-form-toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0;

    li {
      display: inline-block;
      margin-left: 12px;
      margin-right: 12px;

      .form-toolbar-link {
        display: block;
        padding: 1rem 1.6rem .6rem 1.3rem;
        margin-bottom: .4rem;
        cursor: pointer;
        color: black;
        opacity: .5;
        border-bottom: 3px solid rgba(0,0,0,.8);
        transition: .1s ease-in-out;
        white-space: nowrap;


        &.active#orange {
          color: #fa8100;
          border-bottom: 3px solid #fa8100
        }
        &.active#blue {
          color: #6002ee;
          border-bottom: 3px solid #6002ee
        }
        &.active#green {
          color: #41c300;
          border-bottom: 3px solid #41c300
        }
        &.active#red {
          color: #e53935;
          border-bottom: 3px solid #e53935
        }

        &.active {
          opacity: 1;
          transition: .1s ease-in-out;
        }

        &:hover {
          text-decoration: none;
        }
      }
    }
  }

  @media(max-width: 600px) {
    .create-form-toolbar {
      flex-wrap: nowrap;

      li {
        margin-left: 8px;
        margin-right: 8px;
        white-space: nowrap;

        .form-toolbar-link {
          padding: .7rem 1.2rem .4rem 1rem
        }
      }
    }
  }

  @media(max-width: 400px) {
    .create-form-toolbar {
      flex-direction: column;
    }
  }
`