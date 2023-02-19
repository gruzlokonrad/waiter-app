import React from 'react'

const SectionHeader = ({ header, children }) => {
  return (
    <header className='d-flex justify-content-between'>
      <h1>{header}</h1>
      {children}
    </header>
  )
}

export default SectionHeader