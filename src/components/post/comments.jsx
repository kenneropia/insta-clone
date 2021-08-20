import React, { useState, useEffect, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import Loader from 'react-loader-spinner'

import query from '../../helpers/apiQuery'
import AddComment from './add-comment'

const Comments = ({ postId, createdAt, commentInput }) => {
  console.log(createdAt)
  const [comments, setComments] = useState(null)

  // const showNextComments = () => {
  //   setCommentsSlice(commentsSlice + 3)
  // }

  useEffect(async () => {
    const queriedComments = await query.getCommentsForPost(postId)
    setComments(queriedComments)
  }, [])
  return (
    <>
      <div className="border-t-[.2px] mt-3 border-gray-primary p-2 pt-1 ">
        {!comments ? (
          <div className="flex mt-3 items-center justify-center">
            <Loader type="ThreeDots" color="#00BFFF" height={20} width={20} />
          </div>
        ) : (
          <>
            {comments.slice(0, 3).map((item) =>
              item ? (
                <p key={item.id} className="mb-1">
                  {console.log(item)}
                  <Link to={`/p/${item.user.username}`}>
                    <span className="mr-1 font-bold">{item.user.username}</span>
                  </Link>
                  <span>{item.comment}</span>
                </p>
              ) : null
            )}
            {comments.length > 2 ? (
              <Link
                to={`/comments/${postId}`}
                className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
              >
                View more comments
              </Link>
            ) : null}
          </>
        )}
        <p className="text-gray-base uppercase text-xs mt-2">
          {/* {formatDistance(createdAt, new Date())} ago */}
        </p>
      </div>
      <AddComment
        postId={postId}
        createdAt={createdAt}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  )
}

export default Comments
