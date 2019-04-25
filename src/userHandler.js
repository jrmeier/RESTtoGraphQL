export const userGetHandler = dbPromise => async (req, res) => {
  const { query } = req
  const queryKeys = Object.keys(query)
  const db = await dbPromise
  let result;
  
  if (queryKeys.length){
    result = await getUserByEmail(db, query)
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



const getUserByEmail = async (db, param) => await db.models.User.find({...param})
const getAllUsers = async db => await db.models.User.find()

const updateUserById = async (db, updateObject) => 
  await db.models.User({_id: updateObject._id, ...updateObject})

const createNewUser = async (db, newUserObject) => 
  await new db.models.User(newUserObject).save()

const deleteUserById = async (db, _id) =>
  await db.models.User({_id}).remove()
