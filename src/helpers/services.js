import axios from 'axios'

import { add, getTime } from 'date-fns'

// check if user is logged
//if so returns true else false
const isUserLoggedin = () => {
  if (localStorage.getItem('user')) {
    let user = JSON.parse(localStorage.getItem('user'))
    if (Date.now() < user.jwt_expired_at) {
      return true
    }
  }
  return false
}

// fucnction to get the details of the logged user
// from localStorage

const getUserDetails = () => {
  if (localStorage.getItem('user')) {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      if (Date.now() < user.jwt_expired_at) {
        return user
      }
    }
  }
  return false
}

// function to log out the user
const logOut = async () => {
  localStorage.removeItem('user')

  return true
}

// function to sign in a new user and keep their details in the localStorage

const signUp = async (data) => {
  localStorage.removeItem('user')
  let {
    data: {
      user: { username, email, id },
      jwt,
    },
  } = await axios.post('http://localhost:1337/auth/local/register', data)
  let user = {
    jwt,
    username,
    id,
    email,

    jwt_expired_at: getTime(add(Date.now(), { days: 20 })),
  }

  localStorage.setItem('user', JSON.stringify(user))

  return user
}

// a util funtion for the login function

const getUserLogin = async (identifier, password) => {
  let {
    data: {
      jwt,
      user: {
        username,
        email,
        id,
        profile_pic: {
          profile_pic: { url: profile_pic },
        },
      },
    },
  } = await axios.post('http://localhost:1337/auth/local', {
    identifier,
    password,
  })
  let user = {
    jwt,
    username,
    email,
    id,
    profile_pic,

    jwt_expired_at: getTime(add(Date.now(), { days: 20 })),
  }
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

// function to login a user and keep their details in the localStorage
const login = async (i, p) => {
  let user = null
  user = await getUserLogin(i, p)
  return user
}

const auth = {
  getUserDetails,
  isUserLoggedin,
  logOut,
  login,
  signUp,
  getUserLogin,
}

// function for getting posts with pagenation functionality

const getAllPosts = async (_start = 0, _limit = 5) => {
  _start = _start + 1
  let posts = await axios.get('/api/posts', {
    params: {
      _limit,
      _star,
    },
  })
  return posts.data
}

// function for getting a single post

const getOnePost = async (id) => {
  _start = _start + 1
  let post = await axios.get(`/api/posts/${id}`)
  return post.data
}

// get comments for a post

const getCommentsForPost = async (id, _start = 0, _limit = 5) => {
  _start = _start + 1
  let comments = await axios.get('/api/comments', {
    params: {
      post: id,
      _limit,
      _star,
    },
  })
  return comments.data
}

const isUserFollowing = async (userId) => {
  let isUser = await axios.get('/api/followships/count', {
    params: {
      user: getUserDetails().id,
      following: userId,
    },
  })
  console.log(typeof isUser.data)
  return isUser.data
}

// get the profile details for a User

const getMultipleUsers = async (userId) => {
  let min = Math.ceil(1)

  let max = await axios.get(`/users/count`, {
    params: {
      id_nin: userId,
    },
  })
  max = max.data
  max = Math.floor(max + 1)
  let users = []
  for (let i = 0; i < max; i++) {
    users.push(i)
  }

  users = Array.from(users, function getRandomInt() {
    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
  })

  users = [...new Set(users)]

  users.forEach((el, i) => {
    const user = getUserDetails().id
    if (el === user) {
      users.splice(i, 1)
    }
  })

  let awaitedUsers = users.map((el) => axios.get(`/users/${el}`))
  console.log(awaitedUsers)
  users = await Promise.allSettled(awaitedUsers)
  users = users.map((el) => {
    return {
      id: el.value.data.id,
      username: el.value.data.username,
      email: el.value.data.email,
      profile_pic: el.value.data.profile_pic,
    }
  })

  return users
}

const getAUser = async (id) => {
  let user = await axios.get(`/users/${id}`, {
    params: {},
  })
  return user.data
}

const query = {
  getAllPosts,
  getMultipleUsers,
  getAUser,
  getAUser,
  getOnePost,
  getCommentsForPost,
  isUserFollowing,
}

export { auth, query }
