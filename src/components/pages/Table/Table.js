import React, { useEffect, useState } from 'react'
import NotFound from '../NotFound/NotFound'
import { getTableById, updateTable } from '../../../redux/tablesRedux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button, } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { fetchStatus, getAllStatus } from '../../../redux/statusRedux'

const Table = () => {
  const dispatch = useDispatch()
  const allStatus = useSelector(getAllStatus)
  useEffect(() => {
    if (!allStatus.length) {
      dispatch(fetchStatus())
    }
  }, [dispatch, allStatus])
  const { register, handleSubmit: validate, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { tableId } = useParams()
  const table = useSelector(state => getTableById(state, tableId)) || {};
  const [tableData, setTableData] = useState(table)

  const handleSubmit = id => {
    dispatch(updateTable(tableData))
    navigate("/");
  }

  if (!tableData.id) return <NotFound />

  return (
    <Form onSubmit={validate(handleSubmit)}>

      <Form.Group className="mb-3 d-flex gap-3" controlId="formBasicCategory">
        <Form.Label className='fw-bold my-auto'>Status:</Form.Label>
        <Form.Select
          className='w-25'
          aria-label="Status"
          value={tableData.status}
          defaultChecked={0}
          {...register("status", {
            required: true,
            onChange: e => setTableData({ ...tableData, status: e.target.value })
          })}
        >
          <option value="" disabled>Choose..</option>
          {allStatus.map((status, index) => <option key={index} value={index}>{status}</option>)}
        </Form.Select>
        {
          errors.status &&
          <small className="d-block form-text text-danger mt-2">
            This field is required
          </small>
        }
      </Form.Group>

      <Form.Group className="mb-3 d-flex gap-3" controlId="formBasicAuthor">
        <Form.Label className='fw-bold my-auto'>People:</Form.Label>
        <Form.Control
          className='w-25'
          placeholder="Enter author"
          value={tableData.peopleAmount}
          {...register("peopleAmount", {
            required: true,
            onChange: e => setTableData({ ...setTableData, peopleAmount: e.target.value })
          })}
        />
        <div className='my-auto'>/</div>
        <Form.Control
          type="text"
          placeholder="Enter author"
          value={tableData.maxPeopleAmount}
          {...register("maxPeopleAmount", {
            required: true,
            onChange: e => setTableData({ ...setTableData, maxPeopleAmount: e.target.value })
          })}
        />
        {
          (errors.peopleAmount || errors.maxPeopleAmount) &&
          <small className="d-block form-text text-danger mt-2">
            This field is required
          </small>
        }
      </Form.Group>

      <Form.Group className="mb-3 d-flex gap-3" controlId="formBasicShortDescription">
        <Form.Label className='fw-bold my-auto'>Bill: $</Form.Label>
        <Form.Control
          className='w-25'
          placeholder="Enter bill"
          value={tableData.bill}
          onChange={e => setTableData({ ...tableData, bill: e.target.value })}
        />
      </Form.Group>

      <Button variant="primary" type="submit">Update</Button>
    </Form>
  )
}

export default Table