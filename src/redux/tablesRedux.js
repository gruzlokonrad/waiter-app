import { API_URL } from "../config";

// selectors
export const getAllTables = ({ tables }) => tables
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId)

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLE = createActionName('UPDATE_TABLE')
const FETCH_TABLES = createActionName('FETCH_TABLE')

// action creators
export const updateTable = (payload, method = 'PUT') => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  };
  return (dispatch) => {
    fetch(`${API_URL}/table/${payload.id}`, options)
    .then(res => res.json())
    .then(payload => dispatch({ type: UPDATE_TABLE, payload }))
  }
}

export const fetchTables = () => {
  return (dispatch) => {
    fetch(`${API_URL}/table/`)
      .then(res => res.json())
      .then(payload => dispatch({ type: FETCH_TABLES, payload }))
  }
}

const tablesReducer = (statePart = [], { type, payload }) => {
  switch (type) {
    case UPDATE_TABLE:
      return [...statePart.map(table => (table.id === payload.id) ? payload : table)];
    case FETCH_TABLES:
      return [...payload];
    default:
      return statePart;
  }
}

export default tablesReducer