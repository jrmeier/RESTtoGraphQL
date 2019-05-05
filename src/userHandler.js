import {
  getAllUsers,
  getUser,
  updateUserById,
  createNewUser,
  deleteUserById
} from './userResources'
export const userGetHandler = dbPromise => async (req, res) => {
  const { query } = req
  const queryKeys = Object.keys(query)
  const db = await dbPromise
  let result;
  
  if (queryKeys.length){
    result = await getUser(db, query)
  }

  if(!result){
    result = await getAllUsers(db)
  }
  return res.send(result)
}
export const userPostHandler = dbPromise => async (req, res) => {
  const { body } = req
  const db = await dbPromise
  const bodyKeys = Object.keys(body)
  if(!bodyKeys.includes('_id')){
    res.send({error:'_id required to update'})
  }

  const result = await updateUserById(db, body)
  res.send(result)
}

export const userPutHandler = dbPromise => async (req, res) => {
  const { body } = req
  const db = await dbPromise
  const result = await createNewUser(db, body)
  return res.send(result)
}

export const userDeleteHandler = dbPromise => async (req, res) => {
  const { body } = req
  const db = await dbPromise
  if(!Object.keys(body).includes('_id')){
    return res.send({error: '_id required to delete'})
  }
  const result = await deleteUserById(db, body._id)
  return res.send(result)
}
