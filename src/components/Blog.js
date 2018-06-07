import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullView: false
    }

  }

  toggleVisibility = () => {
    this.setState({ fullView: !this.state.fullView })
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

    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          <p onClick={this.toggleVisibility}>{blog.title} {blog.author}</p>
        </div>
        <div style={showWhenVisible}>
          <p onClick={this.toggleVisibility}>{blog.title} {blog.author}</p>
          <a href={blog.url}>{blog.url}</a>
          <p>
            likes: {blog.likes}
            <button>like</button>
          </p>
          <p>added by {blog.user.name}</p>
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