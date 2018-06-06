import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
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

      this.setState({ user })
    } catch (exception) {
      console.log(exception)
    }
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
        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
            {listBlogs()}
          </div>
        }
      </div>
    )
  }
}

export default App;
