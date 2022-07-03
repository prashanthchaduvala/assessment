import React, { useEffect, useState } from 'react'

import { Pagination } from 'antd';

// import DataTable from 'react-data-table-component';


function App() {
  const [posts, setPosts] = useState(null)
  const [postsId, setPostsId] = useState(null)
  const [updating, setUpdating] = useState(false)

  const [title, setTitle] = useState('')
  const [publishDate, setpublishDate] = useState('')

  // const [authors, setAuthors] = useState(null)

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((json) => setPosts(json.posts))
      .catch((err) => console.log(err))
  }, [])

  const createPost = async () => {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, publishDate }),
      })
      const json = await res.json()

      setPosts([...posts, json.posts])
      setTitle('')
      setpublishDate('')
    } catch (err) {
      console.log(err)
    }
  }

  const updatePost = async () => {
    try {
      const res = await fetch(`/api/posts/${postsId}`, {
        method: 'PATCH',
        body: JSON.stringify({ title, publishDate }),
      })
      const json = await res.json()

      const postsCopy = [...posts]
      const index = posts.findIndex((m) => m.id === postsId)
      postsCopy[index] = json.post

      setPosts(postsCopy)
      setTitle('')
      setpublishDate('')
      setUpdating(false)
      setPostsId(null)
    } catch (err) {
      console.log(err)
    }
  }

  const submitForm = async (event) => {
    event.preventDefault()

    if (updating) {
      updatePost()
    } else {
      createPost()
    }
  }

  const onpagechange = async (data) => {
    console.log(data)
  }

  // const deletePost = async (id) => {
  //   try {
  //     await fetch(`/api/posts/${id}`, { method: 'DELETE' })

  //     setPosts(posts.filter((m) => m.id !== id))
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const setMovieToUpdate = (id) => {
  //   const post = posts.find((m) => m.id === id)
  //   if (!post) return
  //   setUpdating(true)
  //   setPostsId(posts.id)
  //   setTitle(post.title)
  //   setpublishDate(post.publishDate)
  // }

  // const fetchAuthors = async (id) => {
  //   try {
  //     const res = await fetch(`/api/posts/${id}/authors`)
  //     const json = await res.json()

  //     // setAuthors(json.authors)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <h1 className="fw-normal text-center my-3">Posts Data</h1>
          <div className="my-4">
            <form onSubmit={submitForm}>
              <div className="row">
                <div className="col-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="col-5">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="publishDate"
                    value={publishDate}
                    onChange={(e) => setpublishDate(e.target.value)}
                  />
                </div>
                <div className="col-2">
                  <button type="submit" className="btn btn-success">
                    {updating ? 'Update' : 'Filter'}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Pagination onChange={onpagechange} pageSize={10}  defaultCurrent={1} total={posts?.length} />
          {posts?.length > 0 ? (
            <table className="table">
              <table style={{"borderWidth":"1px",'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
              
              <thead>
                <tr>
                  <th>id</th>
                  <th>title</th>
                  <th>publishdate</th>
                  <th>author name</th>
                  <th>author avtar</th>
                  <th>summary</th>
                  <th>categories id</th>
                  <th>categories name</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(({ id, title, publishDate,author,summary,categories }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>{publishDate}</td>
                    <td>{author.name}</td>
                    <td>{author.avatar}</td>
                    <th>{summary}</th>
                    <th>{categories.id}</th>
                    <th>{categories.name}</th>
                    <td>
                      {/* <button
                        className="btn btn-warning me-3"
                        onClick={() => setMovieToUpdate(id)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-info me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        // onClick={() => fetchAuthors(id)}
                      >
                        Authors
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deletePost(id)}
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
             
            </table>
            </table>
          ) : posts ? (
            <p>No posts</p>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </div>
      
      {/* <div className="modal fade" tabindex="-1" id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Authors</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {authors?.map((author) => (
                <p key={author.id}>{author.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      
    </div>
  )
}



export default App