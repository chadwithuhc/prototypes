import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BlogSource from './BlogSource'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      photos: []
    }
  }

  componentDidMount() {
    BlogSource.getPosts().then(posts => {
      const photos = []
      posts.map(post => {

        if (post.type === `photo`) {
          post.photos.map(photo => {
            photos.push(photo.alt_sizes[1].url)
          })
        }

      })

      this.setState({ photos })
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.photos.map(photoUrl => {
          return <img src={photoUrl} />
        })}
      </div>
    );
  }
}

export default App;
