import React, { useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../context/AppContext'
import Header from './header'
import Comments from './comments'
import Image from './image'
import Actions from './actions'
import Footer from './footer'

const Post = ({ content }) => {
  const commentInput = useRef(null)
  const handleFocus = () => commentInput.current.focus()
  const {
    auth: { getUserDetails },
  } = useContext(AppContext)
  let userId = getUserDetails().id
  //header, image, actions (like & comment icons), footer, comments
  return (
    <div
      key={content.id}
      className=" w-9/12 h-auto rounded border bg-white border-gray-primary mb-16"
    >
      <Header user={content.user} />
      <Image images={content.images} caption={content.caption} />
      <Actions
        handleFocus={handleFocus}
        userId={userId}
        postId={content.id}
        content={content}
      />
      <Footer caption={content.caption} username={content.user.username} />
      <Comments
        postId={content.id}
        createdAt={content.created_at}
        commentInput={commentInput}
      />
    </div>
  )
}

Post.PropTypes = {
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    caption: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    images: PropTypes.array.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
}

export default Post
