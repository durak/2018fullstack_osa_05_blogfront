import PropTypes from 'prop-types'
import React from 'react'

class Blog extends React.Component {
  static propTypes = {
    handleDestroy: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      fullView: false
    }

  }

  toggleVisibility = () => {
    this.setState({ fullView: !this.state.fullView })
  }

  like = () => {
    let blog = { ...this.props.blog }

    blog.likes = blog.likes + 1
    this.props.handleLike(blog)
  }

  destroy = () => {
    let blog = this.props.blog
    if (window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
      this.props.handleDestroy(blog)
    }
  }

  render() {
    const blog = this.props.blog

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const hideWhenVisible = { display: this.state.fullView ? 'none' : '' }
    const showWhenVisible = { display: this.state.fullView ? '' : 'none' }

    const destroyVisible =
      { display: blog.user && (blog.user.username !== this.props.user.username) ? 'none' : '' }


    return (
      <div style={blogStyle} >
        <div style={hideWhenVisible} className="minimized">
          <p className="clickable" onClick={this.toggleVisibility}>{blog.title} {blog.author}</p>
        </div>
        <div style={showWhenVisible} className="maximized">
          <p className="clickable" onClick={this.toggleVisibility}>{blog.title} {blog.author}</p>
          <a href={blog.url}>{blog.url}</a>
          <p>
            likes: {blog.likes}
            <button onClick={this.like}>like</button>
          </p>
          <p className="addedBy">added by {blog.user ? blog.user.name : 'anonymous'}</p>
          <div className="destroy" style={destroyVisible}>
            <p><button onClick={this.destroy}>delete</button></p>
          </div>
        </div>
      </div>
    )
  }
}

/* const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
) */

export default Blog