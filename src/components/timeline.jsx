import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Post from './post'

import AppContext from './../context/AppContext'

import query from './../helpers/apiQuery'

const TimeLine = () => {
  const [posts, setPosts] = React.useState(null)
  const {
    auth: { getUserDetails },
  } = React.useContext(AppContext)

  React.useEffect(async () => {
    const queriedPosts = await query.getMultiplePosts(getUserDetails().id)
    queriedPosts.sort((a, b) => b.created_at - a.created_at)
    console.log(queriedPosts)
    setPosts(queriedPosts)
  }, [])
  return (
    <div className="container items-center flex flex-col h-[min-content] px-3 md:w-7/12 w-full">
      {!posts ? (
        [1, 2, 3, 4].map(() => (
          <Skeleton
            width={450}
            height={600}
            className="mb-3 md:max-w-[none] max-w-sm md:mx-2 mx-4 flex self-center  "
          />
        ))
      ) : posts?.length > 0 ? (
        posts.map((el) => <Post key={el.id} content={el} />)
      ) : (
        <p className="text-center text-2xl">Follow peope to see photos!</p>
      )}
    </div>
  )
}

export default TimeLine
