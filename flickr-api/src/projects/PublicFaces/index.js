import React from 'react'
import PhotoSource from '../../PhotoSource'

class PublicFaces extends React.Component {

  state = {
    photos: [],
    imageBaseSize: 200,
    imageSize: 150
  }

  componentDidMount() {
    window.onresize = this.setImageSize
    this.fetchPhotos()
  }

  fetchPhotos = (photosetId = '72157688081138315') => {
    PhotoSource.getPhotosFromPhotoset(photosetId).then(photoset => {
      this.setState({
        photos: PhotoSource.populateLocations(photoset.photo).reverse()
      })
      this.setImageSize()
    })
  }

  setImageSize = () => {
    const cols = Math.floor(window.innerWidth / this.state.imageBaseSize)
    const remain = window.innerWidth % this.state.imageBaseSize
    // console.log({cols, remain})
    this.setState({
      imageSize: this.state.imageBaseSize + (remain / cols)
    })
  }

  render() {
    return (
      <main className="public-faces">
        <section className="small-collage">
          {this.state.photos.map(photo => {
            return <img src={PhotoSource.getPhotoUrl(photo, `z`)} alt={photo.title} title={photo.title} key={photo.id} width={this.state.imageSize + `px`} height={this.state.imageSize + `px`} />
          })}
        </section>
      </main>
    )
  }

}

export default PublicFaces
