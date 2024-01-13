import { v4 } from 'uuid'

// const getUUID = () => {

// }

function getUUID() {
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if (!uuid_token) {
    uuid_token = v4()
    localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}

export { getUUID }
