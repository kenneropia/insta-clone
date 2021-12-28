import axios from 'axios'

let userData = JSON.parse(localStorage.getItem('user'))
let jwtToken = userData.jwt

axios.defaults.headers.common['Authorization'] = `bearer ${jwtToken}`

// function for getting posts with pagenation functionality

const handleFollow = async (profileId) => {
  const followed = await axios.post('/api/followships', {
    following: Number(profileId),
  })

  return followed.data
}
const isUserFollowing = async (profileId) => {
  let isUser = await axios.get('/api/followships/count', {
    params: {
      user: userData.id,
      following: profileId,
    },
  })

  return isUser.data
}

const getMultiplePosts = async (userId) => {
  if (!userId) return []
  let following = await axios.get(`/api/followships`, {
    params: {
      user: userId,
    },
  })

  following = following.data.map((el) => el.following.id)

  let users = ''
  following.forEach((el) => {
    users = users + `user_in=${el}&`
  })

  let posts = await (await axios.get(`/api/posts?${users}`)).data
  return posts
}

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
    const user = userId
    if (el === user) {
      users.splice(i, 1)
    }
  })

  let awaitedUsers = users.map((el) => axios.get(`/users/${el}`))

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

const getAllPosts = async (userId, _start = 0, _limit = 5) => {
  _start = _start + 1
  let posts = await axios.get('/api/posts', {
    params: {
      _limit,
      _star,
      user_nin: userId,
    },
  })
  return posts.data
}

const getAllComments = async (postId, _start = 0, _limit = 5) => {
  _start = _start + 1
  let comments = await axios.get('/api/comments', {
    params: {
      post: postId,
      _start,
      _limit,
    },
  })
  return comments.data
}

// function for getting a single post

const getOnePost = async (id) => {
  _start = _start + 1
  let post = await axios.get(`/api/posts/${id}`)
  return post.data
}

// get comments for a post

// get the profile details for a User

const getAUser = async (username) => {
  let user = await axios.get(`/api/search-users`, {
    params: { username },
  })
  return user.data
}

const didUserLike = async (userId, postId) => {
  const isLiked = await axios.get(`/api/likes?_user=${userId}&_post=${postId}`)

  return Boolean(isLiked.data.length) || false
}

const toggleALike = async (userId, postId) => {
  const isLiked = await (
    await axios.get(`/api/likes?_user=${userId}&_post=${postId}`)
  )?.data[0]?.id
  if (isLiked) {
    await axios.delete(`/api/likes/${isLiked}`)
    return true
  } else {
    const liked = await (
      await axios.post(`/api/likes`, {
        post: postId,
        user: userId,
      })
    ).data
    return true
  }
}

const getCommentsForPost = async (postId, _start = 0, _limit = 5) => {
  _start = _start + 1
  let comments = await axios.get('/api/comments', {
    params: {
      post: postId,
      _limit,
      _start,
    },
  })
  return comments.data
}

const createComment = async (comment, postId, _start = 0, _limit = 5) => {
  _start = _start + 1
  let newComment = await axios.post(`/api/comments/`, {
    comment,
    post: postId,
  })
  console.log(newComment)

  newComment = newComment.data

  return newComment
}

const getImagesOfUser = async (profileId = null) => {
  console.log(userData.id)
  let posts = await axios.get(`/api/posts`, {
    params: {
      user: profileId,
    },
  })
  return posts.data.map(({ images }) => images)
}

const getFollowship = async (userId) => {
  const followers = await axios.get('/api/followships/count', {
    params: { following: userId },
  })

  const following = await axios.get('/api/followships/count', {
    params: { user: userId },
  })

  return { following: following.data, followers: followers.data }
}

const query = {
  getFollowship,
  getImagesOfUser,
  createComment,
  toggleALike,
  didUserLike,
  handleFollow,
  getAllComments,
  getAllPosts,
  getMultipleUsers,
  getOnePost,
  getCommentsForPost,
  getMultiplePosts,
  getAUser,
  isUserFollowing,
}

export default query
