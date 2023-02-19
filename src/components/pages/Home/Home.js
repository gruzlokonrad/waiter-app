import React from 'react'
import { useSelector } from 'react-redux'
import { getAllTables } from '../../../redux/tablesRedux'
import SectionHeader from '../../common/SectionHeader/SectionHeader'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const Home = () => {
  const tables = useSelector(getAllTables)
  return (
    <>
      <SectionHeader header='All tables' />
      {tables.map(({ id, status }, index) => (
        <Card className='mx-auto my-2' key={index}>
          <Card.Body className='d-flex gap-4'>
            <Card.Title className='my-auto'>Table {id}</Card.Title>
            <Card.Subtitle className='py-1 mt-auto'><b>Status:</b> {status}</Card.Subtitle>
            <Link to={`/table/${id}`} className='ms-auto'>
              <Button variant="primary">Show more</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default Home