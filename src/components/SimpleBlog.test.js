import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'
import { debug } from 'util';

describe('<Simpleblog />', () => {
  let blogComponent
  let blog

  beforeAll(() => {
    blog = {
      title: 'test blog',
      author: 'test author',
      likes: 99
    }

    blogComponent = shallow(<SimpleBlog blog={blog} />)
  })

  it('renders blog title, author and likes', () => {
    const authorTitleDiv = blogComponent.find('.authorTitle')
    const likesDiv = blogComponent.find('.likes')
    
    expect(authorTitleDiv.text()).toContain(blog.title)
    expect(likesDiv.text()).toContain(blog.likes)
  })
})