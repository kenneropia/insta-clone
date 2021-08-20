import axios from 'axios'
import { add, getTime } from 'date-fns'

const isUserLoggedin = async () => {
  if (localStorage.getItem('user')) {
    let user = JSON.parse(localStorage.getItem('user'))
    if (Date.now() > user.jwt_expired_at) {
      return true
    }
  }
  return false
}

const logOut = async () => {
  localStorage.removeItem('user')
  return true
}

const getUserLogin = async (identifier, password) => {
  let {
    data: {
      user: {
        username,
        email,
        id,
        profile_pic: {
          formats: {
            thumbnail: { url: profile_pic },
          },
        },
      },
    },
  } = await axios.post('/auth/local', {
    identifier,
    password,
  })
  let user = {
    username,
    id,
    email,
    profile_pic,
    jwt_created_at: Date.now(),
    jwt_expired_at: getTime(add(Date.now(), { days: 20 })),
  }
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

const login = async () => {
  if (!localStorage.getItem('user')) {
    let user = getUserLogin()
    return user
  } else if (localStorage.getItem('user')) {
    let user = JSON.parse(localStorage.getItem('user'))
    if (Date.now() > user.jwt_expired_at) {
      user = getUserLogin()
      return user
    }
    user = JSON.parse(localStorage.getItem('user'))
    return user
  }
}

const auth = { isUserLoggedin, logOut, login, getUserLogin }

export { auth }
