import React from 'react'
import PhotoSource from '../PhotoSource'

class Collage extends React.Component {

  state = {
    photos: [],
    category: 'city_state',
    filter: null,
    locationsByProp: {
      topic: [],
      location: [],
      city_state: [],
      all: []
    }
  }

  componentDidMount() {
    const { photosetId } = this.props.match.params
    this.fetchPhotos(photosetId)
  }

  componentWillReceiveProps(props) {
    const { photosetId } = props.match.params
    this.fetchPhotos(photosetId)
  }

  fetchPhotos = (photosetId) => {
    PhotoSource.getPhotosFromPhotoset(photosetId).then(photoset => {
      const photos = PhotoSource.populateLocations(photoset.photo).reverse()
      const locations = PhotoSource.getLocations(photos)

      this.setState({
        allPhotos: photos,
        photos: photos,
        locations,
        locationsByProp: PhotoSource.getLocationsByProp(photos)
      })

    })
  }

  filterPhotos = (value) => {
    return this.setState({
      photos: this.state.allPhotos.filter(photo => photo.info[this.state.category] === value)
    })
  }

  setCategory = (category) => {
    this.setState({ category })
  }

  render() {
    return (
      <main className="flex">

        {/* <section>
          {this.state.photosets.map(photoset => {
            return <p key={photoset.id}>{photoset.title._content}: {photoset.id}</p>
          })}
        </section> */}
        <section className="locations">
          {this.state.locationsByProp[this.state.category].map(filterValue => {
            return <a onClick={() => this.filterPhotos(filterValue)} key={filterValue}>{filterValue}</a>
          })}
        </section>
        {/* <section className="locations">
          {this.state.locationsByProp.locations.map(location => {
            return <a onClick={() => this.filterPhotos({ field: 'location', value: location.location })} key={location.location}>{location.location}</a>
          })}
        </section> */}
        {/* <section className="locations">
          {this.state.locationsByProp.topics.map(location => {
            return <a onClick={() => this.filterPhotos({ field: 'topic', value: location.topic })} key={location.topic}>{location.topic}</a>
          })}
        </section> */}
        <main className="small-collage locked-scroll">
          {this.state.photos.map(photo => {
            return <a href={PhotoSource.getPageURL(photo)} target="blank" rel="noreffer" title={photo.title} key={photo.id}><img src={PhotoSource.getPhotoUrl(photo)} alt={photo.title} /></a>
          })}
        </main>
      </main>
    )
  }

}

export default Collage
