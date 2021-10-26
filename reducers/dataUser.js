export default function (dataUser = [], action) {
  if (action.type == "addUser") {
    var dataUser = [...dataUser, action.dataUser]
    return dataUser
  } else {
    return dataUser
  }
}
