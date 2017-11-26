class PhotoSource {

  constructor(API_KEY) {
    this.API_KEY = API_KEY
    this.API_KEY_URI = 'api_key=' + API_KEY
    this.API_BASE_URL = `https://api.flickr.com/services/rest/?format=json&nojsoncallback=1&${this.API_KEY_URI}`
  }

  getPhotosets() {
    return fetch(`${this.API_BASE_URL}&method=flickr.photosets.getList&user_id=14608120@N00`)
    .then(res => res.json())
    .then((data) => {
      return data.photosets.photoset
    })
  }

  getPhotosFromPhotoset(photoset_id) {
    return fetch(`${this.API_BASE_URL}&method=flickr.photosets.getPhotos&user_id=14608120@N00&photoset_id=${photoset_id}`)
    .then(res => res.json())
    .then((data) => {
      return data.photoset
    })
  }

  getPhotoUrl(photo, options = 'q') {
    console.log('photo', photo)
    // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${options}.jpg`
  }

  getLocation(photo) {
    // 
    return photo.title
  }

}

export default new PhotoSource(process.env.REACT_APP_API_KEY)
