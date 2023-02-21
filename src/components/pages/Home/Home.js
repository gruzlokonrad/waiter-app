import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllTables } from '../../../redux/tablesRedux'
import SectionHeader from '../../common/SectionHeader/SectionHeader'
import { Card, Button, Placeholder } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const Home = () => {
  const tables = useSelector(getAllTables)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!tables.length) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [tables])

  const renderLoader = () => {
    const placeholderDetails = [10, 6, 11, 5]

    return (
      placeholderDetails.map((placeholder, index) => (
        <Card className='mx-auto my-2 pt-3 pb-2 px-4' key={index}>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={placeholder} />
          </Placeholder>
        </Card>
      ))
    )
  }

  const renderTablesView = () => (
    tables.map(({ id, status }, index) => (
      <Card className='mx-auto my-2' key={index}>
        <Card.Body className='d-flex gap-4'>
          <Card.Title className='my-auto'>Table {id}</Card.Title>
          <Card.Subtitle className='py-1 mt-auto'><b>Status:</b> {status}</Card.Subtitle>
          <Link to={`/table/${id}`} className='ms-auto'>
            <Button variant="primary">Show more</Button>
          </Link>
        </Card.Body>
      </Card>
    ))
  )

  return (
    <>
      <SectionHeader header='All tables' />

      {
        loading
          ? renderLoader()
          : renderTablesView()
      }
    </>
  )
}

export default Home