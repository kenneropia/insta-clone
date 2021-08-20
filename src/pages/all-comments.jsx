import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import query from './../helpers/apiQuery'

const AllComments = () => {
  const [comments, setComments] = useState([])
  const [index, setIndex] = useState(4)
  const [isLoading, setIsLoading] = useState(false)

  let { postId } = useParams()

  useEffect(async () => {
    let start = index <= 4 ? 0 : index - 4

    let queriedComments = await query.getAllComments(postId, start, index)
    setComments([...comments, ...queriedComments])
    setIsLoading(false)
  }, [index, query.getAllComments])

  return (
    <div>
      <div className="h-full w-full p-2 text-4xl border-b border-black-faded">
        All comments
      </div>
      <div className="mt-5 px-2 h-auto w-auto text-md">
        {comments.map((item) => (
          <p className="pb-2"> {item.comment} </p>
        ))}
      </div>
      <button
        className={`bg-blue-medium flex justify-center items-center text-center text-white w-full h-8 
              font-bold `}
        onClick={() => {
          if (!isLoading) {
            setIndex((prev) => prev + 4)
            setIsLoading(true)
          }
        }}
      >
        {isLoading ? (
          <Loader type="ThreeDots" color="#00BFFF" height={20} width={20} />
        ) : (
          'Load More'
        )}
      </button>
    </div>
  )
}

export default AllComments
