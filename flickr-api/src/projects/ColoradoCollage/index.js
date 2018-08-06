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
        allPhotos: photos.reverse(),
        photos: photos.reverse(),
        locations,
        photosWithData: photos.reverse().map(photo => {
          photo.info = PhotoSource.getLocation(photo)
          return photo
        }),
        locationsByProp: PhotoSource.getLocationsByProp(photos)
      })

    })
  }

  filterPhotos = ({ field, value }) => {
    return this.setState({
      photos: this.state.photosWithData.filter(photo => photo.info[field] === value)
    })
  }

  render() {
    return (
      <main className="flex">
        <h2 className="collage-header">
          {[
            ['topics', 'Topics'],
            ['locations', 'Locations'],
            ['city_state', 'Cities'],
            ['locations', 'All']
          ].map(item => {
            return (
              <span>
                <span className="total">{this.state.locationsByProp[item[0]].length}</span> {item[1]}<br/>
              </span>
            )
          })}
        </h2>
        {/* <section>
          {this.state.photosets.map(photoset => {
            return <p key={photoset.id}>{photoset.title._content}: {photoset.id}</p>
          })}
        </section> */}
        <section className="locations">
          {this.state.locationsByProp.city_state.map(location => {
            return <a onClick={() => this.filterPhotos({ field: 'city_state', value: location[0].city_state })} key={location[0].city_state}>{location[0].city_state}</a>
          })}
        </section>
        <main className="collage">
          {this.state.photos.map(photo => {
            photo = PhotoSource.getPhotoUrl(photo)
            return <img key={photo} src={photo} alt={photo} />
          })}
        </main>
      </main>
    )
  }

}

export default ColoradoCollage
