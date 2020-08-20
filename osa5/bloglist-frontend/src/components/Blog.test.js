import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

test('by default title and author rendered but url or likes not', () => {
  const blog = {
    title: 'Component testing with react-testing-library',
    author: 'Test Author',
    url: 'https://fullstackopen.com/osa5/react_sovellusten_testaaminen',
    likes: 0,
    user: '5f3a8aab74d0f63dd9921f2c'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Test Author'
  )
  expect(component.container).not.toHaveTextContent(
    'https://fullstackopen.com/osa5/react_sovellusten_testaaminen'
  )
  expect(component.container).not.toHaveTextContent(
    'likes'
  )

})

test('url and likes rendered after pressing button show all', async () => {
  const blog = {
    title: 'Component testing with react-testing-library',
    author: 'Test Author',
    url: 'https://fullstackopen.com/osa5/react_sovellusten_testaaminen',
    likes: 0,
    user: '5f3a8aab74d0f63dd9921f2c'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('show info')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Component testing with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Test Author'
  )
  expect(component.container).toHaveTextContent(
    'https://fullstackopen.com/osa5/react_sovellusten_testaaminen'
  )
  expect(component.container).toHaveTextContent(
    'likes 0'
  )
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing with react-testing-library',
    author: 'Test Author',
    url: 'https://fullstackopen.com/osa5/react_sovellusten_testaaminen',
    likes: 0,
    user: '5f3a8aab74d0f63dd9921f2c'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} likeBlog={mockHandler} />
  )

  const button = component.getByText('show info')
  fireEvent.click(button)


  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('newblogform calls return funcion with correct props', async () => {
  const createBlog = jest.fn()

  const component = render(
    <NewBlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('div.formDiv input[id="title"]')
  //console.log('DEBUG: ', prettyDOM(title))
  const author = component.container.querySelector('div.formDiv input[id="author"]')
  //console.log('DEBUG: ', prettyDOM(author))
  const url = component.container.querySelector('div.formDiv input[id="url"]')
  //console.log('DEBUG: ', prettyDOM(url))
  //const title = component.querySelector('input').getByText('title')
  //const title = component.container.querySelector('input').querySelector('title')
  //const title = component.container.querySelector('xqcafs')
  //const author = component.container.querySelector('input').querySelector('.author')
  //const url = component.container.querySelector('input').querySelector('.url')
  const form = component.container.querySelector('form')
  //console.log('DEBUG: ', prettyDOM(form))

  //component.debug()

  fireEvent.change(title, {
    target: { value: 'titletest' }
  })

  fireEvent.change(author, {
    target: { value: 'authortest' }
  })
  fireEvent.change(url, {
    target: { value: 'urltest' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  //console.log(createBlog.mock.calls[0])
  expect(createBlog.mock.calls[0][0].title).toBe('titletest' )
  expect(createBlog.mock.calls[0][0].author).toBe('authortest' )
  expect(createBlog.mock.calls[0][0].url).toBe('urltest' )


  /* const mockHandler = jest.fn()

  const component = render(<NewBlogForm createBlog={mockHandler} />)

  expect(
    component.container.querySelector('.test')
  ).toBeDefined()

  expect(
    component.container.querySelector('.author')
  ).toBeDefined()

  expect(
    component.container.querySelector('.url')
  ).toBeDefined()

  expect(
    component.container.querySelector('.tesasdsadat')
  ).toBeDefined() */

})