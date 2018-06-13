let token = null

let blogs = [
  {
    id: '1',
    author: 'author 1',
    title: 'title 1',
    url: 'url 1',
    user: { username: 'username 1', name: 'user 1 name' }
  },
  {
    id: '2',
    author: 'author 2',
    title: 'title 2',
    url: 'url 2',
    user: { username: 'username 2', name: 'user 2 name' }
  },
  {
    id: '3',
    author: 'author 3',
    title: 'title 3',
    url: 'url 3',
    user: { username: 'username 3', name: 'user 3 name' }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = newToken
}

export default {getAll, blogs, setToken}