import React, { useState, useEffect } from 'react'
import { fullHeaderData } from '../../data/headers'
import { StyledHeader } from '../../styles/Layout.style'


export const Header = ({
  formStep
}) => {
  const [headerData, setHeaderData] = useState(fullHeaderData[formStep])

  useEffect(() => {
    setHeaderData(fullHeaderData[formStep])
  }, [formStep])

  return (
    <StyledHeader className="create-header">
      <h1 className="header-title">{headerData.title}</h1>
      <p className="header-description">{headerData.description}</p>
    </StyledHeader>
  )
}
