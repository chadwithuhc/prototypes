import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ColoradoCollage from './projects/ColoradoCollage/index'
import SinglePage from './projects/SinglePage'

import PhotoSource from './PhotoSource'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      photosets: [],
      photos: [],
      locations: [],
      locationsByProp: {
        topics: [],
        locations: [],
        city_state: []
      }
    }
  }

  componentDidMount() {
    PhotoSource.getPhotosets().then(photosets => {
      // console.log(photosets)
      this.setState({
        photosets
      })

      PhotoSource.getPhotosFromPhotoset(`72157682668038663`).then(photoset => {
        // console.log(photoset.photo)
        const photos = photoset.photo
        const locations = PhotoSource.getLocations(photos)

        this.setState({
          photos: photos.map(photo => PhotoSource.getPhotoUrl(photo)),
          locations,
          locationsByProp: PhotoSource.getLocationsByProp(photos)
        })

      })
    })
  }

  render() {
    console.log(`Photos: ${this.state.photos.length}`, `Locations: ${this.state.locations.length}`)

    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/collage" component={ColoradoCollage} />
            <Route path="/single" component={SinglePage} />
          </div>
        </Router>
        {/* {this.state.photosets.map(photoset => {
          return <p key={photoset.id}>{photoset.title._content}: {photoset.id}</p>
        })} */}
        {/* <h2>
          Topics: {this.state.locationsByProp.topics.length} |
          Locations: {this.state.locationsByProp.locations.length} |
          Cities: {this.state.locationsByProp.city_state.length} |
          All: {this.state.locations.length}
        </h2>
        {this.state.locationsByProp.city_state.map(location => {
          return <h2 key={location[0].city_state}>{location[0].city_state}</h2>
        })}
        {this.state.photos.reverse().map(photo => {
          return <img key={photo} src={photo} alt={photo.title} />
        })} */}
      </div>
    );
  }
}

export default App;
