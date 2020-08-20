import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

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