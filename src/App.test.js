import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

describe('<App />', () => {
  let app
  const user = {
    username: 'tester',
    token: '1231231214',
    name: 'Teuvo Testaaja'
  }

  describe('when user is not logged in', () => {
    beforeEach(() => {
      localStorage.clear()
      app = mount(<App />)
    })

    it('login form is shown', () => {
      app.update()
      const loginComponent = app.find(LoginForm)

      expect(loginComponent.length).toBe(1)
      expect(loginComponent.containsMatchingElement(<input name="username" />)).toBe(true)
      expect(loginComponent.containsMatchingElement(<input name="password" />)).toBe(true)
    })

    it('no blogs are rendered', () => {
      app.update()
      const blogsComponents = app.find(Blog)

      expect(blogsComponents.length).toBe(0)
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('all blogs are rendered', () => {
      app.update()
      const blogsComponents = app.find(Blog)

      expect(blogsComponents.length).toBe(blogService.blogs.length)
    })

    it('log in form is not rendered', () => {
      app.update()
      const loginComponent = app.find(LoginForm)

      expect(loginComponent.length).toBe(0)
    })

  })

})