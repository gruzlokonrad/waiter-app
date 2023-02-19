// selectors
// export const getListById = ({ lists }, listId) => lists.find(list => list.id === listId)
export const getAllTables = ({ tables }) => tables
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId)

// actions
const createActionName = actionName => `app/tables/${actionName}`;
// const ADD_LIST = createActionName('ADD_LIST');
const UPDATE_TABLE = createActionName('UPDATE_TABLE')
const FETCH_TABLE = createActionName('FETCH_TABLE')

// action creators
// export const addList = payload => ({ type: ADD_LIST, payload })
export const updateTable = payload => ({ type: UPDATE_TABLE, payload })
export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/table/all')
      .then(res => res.json())
      .then(payload => dispatch({ type: FETCH_TABLE, payload }))
  }
}

const tablesReducer = (statePart = [], { type, payload }) => {
  switch (type) {
    case UPDATE_TABLE:
      return [...statePart.map(table => (payload.id === table.id) ? payload : table)];
    case FETCH_TABLE:
      return payload;
    default:
      return statePart;
  }
}

export default tablesReducer