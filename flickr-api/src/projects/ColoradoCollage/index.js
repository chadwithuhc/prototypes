import React from 'react'
import PhotoSource from '../../PhotoSource'

class ColoradoCollage extends React.Component {

  state = {
    photos: [],
    locationsByProp: {
      topics: [],
      locations: [],
      city_state: []
    }
  }

  componentDidMount() {
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
  }

  render() {
    return (
      <main className="collage">
        {this.state.photos.reverse().map(photo => {
          return <img key={photo} src={photo} alt={photo} />
        })}
      </main>
    )
  }

}

export default ColoradoCollage
