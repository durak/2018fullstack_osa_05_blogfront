import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'
import { debug } from 'util'

describe('<Simpleblog />', () => {
  let blogComponent
  let blog
  let mockHandler

  beforeAll(() => {
    blog = {
      title: 'test blog',
      author: 'test author',
      likes: 99
    }

    mockHandler = jest.fn()    

    blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
  })

  it('renders blog title, author and likes', () => {
    const authorTitleDiv = blogComponent.find('.authorTitle')
    const likesDiv = blogComponent.find('.likes')
    
    expect(authorTitleDiv.text()).toContain(blog.title)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('after clicking the Like button twice handler function is called twice', () => {
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})