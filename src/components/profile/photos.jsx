import React from 'react'
import Skeleton from 'react-loading-skeleton'
export default function Photos({ photos }) {
  return (
    <div className="flex md:justify-start justify-center flex-row flex-wrap mx-auto pt-6   w-full  border-t-[1px]">
      {!photos ? (
        new Array(12).fill(0).map((_, i) => (
          <div className="w-full">
            <Skeleton key={i} width={'100%'} height={400} />{' '}
          </div>
        ))
      ) : photos.length > 0 ? (
        photos.map((p, i) => (
          <div
            key={i}
            className="md:w-[30%] mb-5 w-10/12 min-w-[30%] md:h-72 h-96  md:ml-4"
          >
            <img className="w-full h-full" src={p[0].url} />
          </div>
        ))
      ) : (
        <p>make posts if u want them to appear in your profile</p>
      )}
    </div>
  )
}
