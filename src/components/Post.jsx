import React from 'react'
import PropTypes from 'prop-types'
import './Post.css'

function Post(props) {
  return (
    <a className="post" href={props.link}>
      <img className="avatar" src={props.owner.profile_image
        ? props.owner.profile_image
        : 'http://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder-300x300.png'
      }
        alt="avatar" />
      <p>{props.title}</p>
    </a>
  )
}

Post.propTypes = {
  link: PropTypes.string.isRequired,
  owner: PropTypes.object,
  title: PropTypes.string.isRequired
}

export default Post

