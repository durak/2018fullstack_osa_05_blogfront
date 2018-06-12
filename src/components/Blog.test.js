import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import { debug } from 'util'

describe('<Blog />', () => {

  let blogComponent
  const mockHandleDestroy = jest.fn()
  const mockHandleLike = jest.fn()

  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'http://testurl.com',
    likes: 99,
    user: { name: 'test user full name', username: 'testusername' }
  }

  const user = {
    username: 'testusername'
  }

  beforeEach(() => {
    blogComponent = shallow(
      <Blog
        blog={blog}
        user={user}
        handleDestroy={mockHandleDestroy}
        handleLike={mockHandleLike}
      />
    )
  })


  it('at start displays blog author and title', () => {
    const minimizedDiv = blogComponent.find('.minimized')
    expect(minimizedDiv.text()).toContain(blog.author)
    expect(minimizedDiv.text()).toContain(blog.title)
  })

  it('at start full blog information is not shown', () => {
    const maximizedDiv = blogComponent.find('.maximized')

    expect(maximizedDiv.getElement().props.style).toEqual({ display: 'none' })
    expect(maximizedDiv.prop('style')).toEqual({ display: 'none' })
    expect(maximizedDiv.props().style).toEqual({ display: 'none' })

  })

  it('after clicking the title / author all information about blog is shown', () => {
    const clickable = blogComponent.find('.minimized').find('.clickable')
    clickable.simulate('click')

    const maximizedDiv = blogComponent.find('.maximized')
    expect(maximizedDiv.prop('style')).toEqual({ display: '' })
  })

  it('blog is minimized again after clicking on a maximized blog', () => {
    let clickable = blogComponent.find('.minimized').find('.clickable')
    clickable.simulate('click')

    const maximizedClickable = blogComponent.find('.maximized').find('.clickable')
    maximizedClickable.simulate('click')

    const maximizedDiv = blogComponent.find('.maximized')
    expect(maximizedDiv.prop('style')).toEqual({ display: 'none' })
  })

  it('clicking the like button calls like handler function', () => {
    const button = blogComponent.find('button')
    button.at(0).simulate('click')
    expect(mockHandleLike.mock.calls.length).toBe(1)
  })

  it('blog is shown added by correct user when blog contains user information', () => {
    const addedBy = blogComponent.find('.addedBy')
    expect(addedBy.text()).toContain(`added by ${blog.user.name}`)
  })

  it('blog is shown added by anonymous when blog does not contain user information', () => {
    let anonymousBlog = { ...blog }
    delete anonymousBlog.user
    const anonymousBlogComponent = shallow(
      <Blog
        blog={anonymousBlog}
        user={user}
        handleDestroy={mockHandleDestroy}
        handleLike={mockHandleLike}
      />
    )

    const addedBy = anonymousBlogComponent.find('.addedBy')
    expect(addedBy.text()).toContain('added by anonymous')
  })

  it('delete button is shown when user has added the blog themselves', () => {
    const deleteDiv = blogComponent.find('.destroy')
    expect(deleteDiv.prop('style')).toEqual({ display: '' })
  })

  it('delete button is shown on anonymous blogs', () => {
    let anonymousBlog = { ...blog }
    delete anonymousBlog.user
    const anonymousBlogComponent = shallow(
      <Blog
        blog={anonymousBlog}
        user={user}
        handleDestroy={mockHandleDestroy}
        handleLike={mockHandleLike}
      />
    )

    const deleteDiv = blogComponent.find('.destroy')
    expect(deleteDiv.prop('style')).toEqual({ display: '' })
  })

  it('delete button is hidden when user has not added the blog', () => {
    let anotherUserBlog = { ...blog, user: { name: 'someone else', username: 'someothername' } }
    
    const anotherUserBlogComponent = shallow(
      <Blog
        blog={anotherUserBlog}
        user={user}
        handleDestroy={mockHandleDestroy}
        handleLike={mockHandleLike}
      />
    )

    const deleteDiv = anotherUserBlogComponent.find('.destroy')
    expect(deleteDiv.prop('style')).toEqual({ display: 'none' })
  })


})
