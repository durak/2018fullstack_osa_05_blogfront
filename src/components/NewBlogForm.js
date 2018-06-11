import PropTypes from 'prop-types'
import React from 'react'

class NewBlogForm extends React.Component {
  static propTypes = {
    addBlog: PropTypes.func.isRequired    
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      title: '',
      author: '',
      url: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const newBlog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    this.setState({
      title: '', author: '', url: ''
    })

    this.props.addBlog(newBlog)
  }


  render() {


    return (



      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            title
              <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            author
              <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </div>
          <div>
            url
              <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">lisää</button>
        </form>
      </div>

    )
  }
}

export default NewBlogForm