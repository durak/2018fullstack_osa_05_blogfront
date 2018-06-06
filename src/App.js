import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      message: null,
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  login = async (e) => {
    e.preventDefault()
    console.log('login in with', this.state.username, this.state.password)

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
      this.setState({ user })
      blogService.setToken(user.token)
    } catch (exception) {

      console.log(exception)
      this.setState({
        error: 'wrong username or passowrd'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')

    const usrname = this.state.user.username

    this.setState({
      user: null,
      message: `user ${usrname} logged out`
    })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)



  }

  addBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogUrl
    }

    const savedBlog = await blogService.create(newBlog)

    const msg = `a new blog ${savedBlog.title} by ${savedBlog.author} added`

    this.setState({
      blogs: this.state.blogs.concat(savedBlog),
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
      message: msg
    })

    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  render() {

    const loginForm = () => (
      <div >
        <h2> Kirjaudu sisään </h2>
        <form onSubmit={this.login}>
          <div>
            Käyttäjänimi
            <input type="text" name="username" value={this.state.username} onChange={this.handleFieldChange} />
          </div>
          <div>
            Salasana
            <input type="password" name="password" value={this.state.password} onChange={this.handleFieldChange} />
          </div>
          <button>kirjaudu</button>
        </form>
      </div >
    )

    const logoutForm = () => (
      <div>
        <p>{this.state.user.name} logged in</p>
        <button onClick={this.logout}> logout </button>
      </div>
    )

    const listBlogs = () => (
      <div>
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )

    return (
      <div>
        <Notification message={this.state.error} type="error" />
        <Notification message={this.state.message} type="message" />

        {this.state.user === null ?
          loginForm() :

          <div>
            {logoutForm()}
            {listBlogs()}


            <NewBlogForm
              addBlog={this.addBlog}
              newBlog={
                {
                  title: this.state.newBlogTitle,
                  author: this.state.newBlogAuthor,
                  url: this.state.newBlogUrl
                }
              }
              handleChange={this.handleFieldChange}
            />
          </div>
        }



      </div>
    )
  }
}

const NewBlogForm = ({ addBlog, newBlog, handleChange }) => {
  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input type="text" name="newBlogTitle" value={newBlog.title} onChange={handleChange} />
        </div>
        <div>
          author
          <input type="text" name="newBlogAuthor" value={newBlog.author} onChange={handleChange} />
        </div>
        <div>
          url
          <input type="text" name="newBlogUrl" value={newBlog.url} onChange={handleChange} />
        </div>
        <button type="submit">lisää</button>
      </form>
    </div>
  )
}

export default App
