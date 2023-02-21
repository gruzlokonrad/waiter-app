import React, { useEffect, useState } from 'react'
import NotFound from '../NotFound/NotFound'
import { fetchTables, getTableById, updateTable } from '../../../redux/tablesRedux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { fetchStatus, getAllStatus } from '../../../redux/statusRedux'

const Table = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { register, handleSubmit: validate, formState: { errors } } = useForm();
  const { tableId } = useParams()

  const allStatus = useSelector(getAllStatus)
  const [tableData, setTableData] = useState(useSelector(state => getTableById(state, tableId)))

  const handleSubmit = (payload) => {
    payload.id = tableData.id
    switch (payload.status) {
      case 'Busy':
        payload.bill = 0;
        break;
      case 'Free':
      case 'Cleaning':
        payload.peopleAmount = 0;
        break;
      default:
        break;
    }
    console.log('payload', payload)
    dispatch(updateTable(payload))
    navigate("/");
  }

  if (!tableData?.id) return <NotFound />

  return (
    <Form onSubmit={validate(handleSubmit)} >
      <Form.Group className="mb-3 d-flex gap-3" controlId="formBasicCategory">
        <Form.Label className='fw-bold my-auto'>Status:</Form.Label>
        <Form.Select
          className='w-25'
          aria-label="Status"
          {...register("status", {
            required: true,
            value: tableData.status,
            onChange: e => setTableData({ ...tableData, status: e.target.value })
          })}
        >
          <option value="" disabled>Choose..</option>
          {allStatus.map((status, index) => <option key={index} value={status}>{status}</option>)}
        </Form.Select>

      </Form.Group>

      <Form.Group className="mb-3 d-flex gap-3" controlId="formBasicAuthor">
        <Form.Label className='fw-bold my-auto'>People:</Form.Label>
        <Form.Control
          type='number'
          className='w-25'
          value={tableData.peopleAmount}
          {...register("peopleAmount", {
            required: true,
            min: 0,
            max: tableData.maxPeopleAmount,
            onChange: e => setTableData({ ...tableData, peopleAmount: e.target.value })
          })}
        />
        <div className='my-auto'>/</div>
        <Form.Control
          type='number'
          className='w-25'
          value={tableData.maxPeopleAmount}
          {...register("maxPeopleAmount", {
            required: true,
            min: 0,
            max: 10,
            onChange: e => {
                setTableData(state => { return Object.assign({}, state, { maxPeopleAmount: e.target.value }) })
            }
          })}
        />
      </Form.Group>

      {
        tableData.status === 'Busy'
        && <Form.Group className="mb-3 d-flex gap-3" controlId="formBasicShortDescription">
          <Form.Label className='fw-bold my-auto'>Bill:</Form.Label>
          <InputGroup className='w-25'>
            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
            <Form.Control
              type='number'
              value={tableData.bill}
              // onChange={e => setTableData({ ...tableData, bill: e.target.value })}
              {...register("bill", {
                // value: tableData.bill,
                onChange: e => setTableData({ ...tableData, bill: e.target.value })
              })}
            />
          </InputGroup>
        </Form.Group>
      }


      {
        errors.status &&
        <small className="d-block form-text text-danger mt-2">
          This field is required
        </small>
      }
      {
        errors.peopleAmount &&
        <small className="d-block form-text text-danger mt-2">
          This field is required (0 - {tableData.maxPeopleAmount} people)
        </small>
      }
      {
        errors.maxPeopleAmount &&
        <small className="d-block form-text text-danger mt-2">
          This field is required (0 - 10 people)
        </small>
      }

      <Button variant="primary" type="submit" className='mt-3'>Update</Button>
    </Form>
  )
}

export default Table