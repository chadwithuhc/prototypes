import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PhotoSource from './PhotoSource'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      photosets: [],
      photos: []
    }
  }

  componentDidMount() {
    PhotoSource.getPhotosets().then(photosets => {
      console.log(photosets)
      this.setState({
        photosets
      })

      PhotoSource.getPhotosFromPhotoset(`72157682574330834`).then(photoset => {
        console.log(photoset.photo)

        this.setState({
          photos: photoset.photo.map(photo => PhotoSource.getPhotoUrl(photo))
        })

      })
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.photosets.map(photoset => {
          return <p key={photoset.id}>{photoset.title._content}: {photoset.id}</p>
        })}
        {this.state.photos.map(photo => {
          return <img key={photo} src={photo} />
        })}
      </div>
    );
  }
}

export default App;
