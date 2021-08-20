import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const Image = ({ images, caption }) => {
  return (
    <div className="h-auto">
      {Array.isArray(images) ? (
        <Carousel showThumbs={false}>
          {images.map(({ url }) => {
            return <img className="h-auto" src={url} alt={caption} />
          })}
        </Carousel>
      ) : (
        <img className="h-auto" src={images.url} alt={caption} />
      )}
    </div>
  )
}

export default Image
