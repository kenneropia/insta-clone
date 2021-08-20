import React from 'react'
import PropTypes from 'prop-types'

const Footer = ({ caption, username }) => {
  return (
    <div className="py-4 px-2 pt-2 pb-0">
      <span className="mr-1 font-bold">{username}</span>
      <span>{caption}</span>
    </div>
  )
}
export default Footer
Footer.proptypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}
