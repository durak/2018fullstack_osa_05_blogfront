import PropTypes from 'prop-types'
import React from 'react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <div >
      <h2> Kirjaudu sisään </h2>
      <form onSubmit={handleSubmit}>
        <div>
          Käyttäjänimi
        <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>

        <div>
          Salasana
        <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button>kirjaudu</button>
      </form>
    </div >
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm