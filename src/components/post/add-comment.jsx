import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import query from '../../helpers/apiQuery'
import AppContext from '../../context/AppContext'

export default function AddComment({ postId, setComments, commentInput }) {
  const [comment, setComment] = useState('')
  const {
    auth: {
      getUserDetails: { username },
    },
  } = useContext(AppContext)

  const handleSubmitComment = async (event) => {
    event.preventDefault()
    try {
      let gotComment = await query.createComment(comment, postId)
      console.log(gotComment)
      setComments((prev) => {
        console.log([...prev, gotComment])
        return [...prev, gotComment]
      })
      setComment('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add acomment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          aria-disabled={comment.length < 1}
          className={`text-sm font-bold text-blue-medium ${
            !comment && 'opacity-25'
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  )
}
