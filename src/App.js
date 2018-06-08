import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      message: null
    }
    this.newBlogForm = React.createRef()
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


  addBlog = async (newBlog) => {
    try {
      this.newBlogForm.current.toggleVisibility()
      const savedBlog = await blogService.create(newBlog)

      const msg = `a new blog ${savedBlog.title} by ${savedBlog.author} added`

      this.setState({
        blogs: this.state.blogs.concat(savedBlog),
        message: msg
      })

      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    } catch (exception) {

      console.log(exception)
    }
  }

  likeBlog = async (likedBlog) => {
    try {
      const savedBlog = await blogService.update(likedBlog)

      this.setState({
        blogs: this.state.blogs.map(blog => blog.id !== savedBlog.id ? blog : savedBlog)
      })

    } catch (exception) {
      console.log(exception)
    }
  }

  destroyBlog = async (blog) => {
    try {
      const response = await blogService.destroy(blog)
      console.log(response)
      this.setState({
        blogs: this.state.blogs.filter(b => b.id !== blog.id)
      })
    } catch (exception){
      console.log(exception)
    }
  }

  render() {

    const logoutForm = () => (
      <div>
        <p>{this.state.user.name} logged in</p>
        <button onClick={this.logout}> logout </button>
      </div>
    )

    const listBlogs = () => {
      let sortedBlogs = [].concat(this.state.blogs)
      sortedBlogs.sort((a, b) => {
        return b.likes - a.likes
      })
      
      return (
        <div>
          <h2>blogs</h2>
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={this.likeBlog} handleDestroy={this.destroyBlog} user={this.state.user} />
          )}
        </div>
      )
    }

    return (
      <div>
        <Notification message={this.state.error} type="error" />
        <Notification message={this.state.message} type="message" />

        {this.state.user === null ?
          <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleFieldChange}
            username={this.state.username}
            password={this.state.password}
          />

          :

          <div>
            {logoutForm()}
            {listBlogs()}
            <Togglable buttonLabel="Add new blog" ref={this.newBlogForm}>
              <NewBlogForm addBlog={this.addBlog} />
            </Togglable>
          </div>
        }



      </div>
    )
  }
}

export default App
