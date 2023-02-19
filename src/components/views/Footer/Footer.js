import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
  const thisYear = new Date().getFullYear()
  return (
    <Container>
      <div className='text-muted text-center my-2 p-2'>
        Copyright &copy; {thisYear}
      </div>
    </Container>
  )
}

export default Footer