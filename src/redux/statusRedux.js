// selectors
// export const getListById = ({ lists }, listId) => lists.find(list => list.id === listId)
export const getAllStatus = ({ status }) => status

// actions
const createActionName = actionName => `app/tables/${actionName}`;
// const ADD_LIST = createActionName('ADD_LIST');
const UPDATE_STATUS = createActionName('UPDATE_STATUS')

// action creators
// export const addList = payload => ({ type: ADD_LIST, payload })
export const updateStatus = payload => ({type: UPDATE_STATUS, payload})
export const fetchStatus = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/status/all')
      .then(res => res.json())
      .then(status => dispatch(updateStatus(status)))
  }
}

const statusReducer = (statePart = [], { type, payload }) => {
  switch (type) {
    case UPDATE_STATUS:
      return payload;
    default:
      return statePart;
  }
}

export default statusReducer