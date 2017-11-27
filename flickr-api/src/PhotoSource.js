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
    // console.log('photo', photo)
    // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${options}.jpg`
  }

  getLocation(photo) {
    // [topic] at [location] in [city, state]
    // Campfires in Rocky Mountain National Park, CO
    // Colorado Rockies at Coors Field in Denver, CO
    // Dillon Reservoir in Frisco, CO
    // Breckenridge, CO

    const photoDetails = {}
    const step1 = photo.title.split(' at ')
    // console.log(step1)
    let step2

    // We have a [topic] match
    if (step1.length > 1) {
      photoDetails.topic = step1[0]
      step2 = step1[1]
    }
    else {
      step2 = step1[0]
    }

    const step3 = step2.split(' in ')
    let step4

    // console.log(step3)
    if (step3.length > 1) {
      photoDetails.location = step3[0]
      step4 = step3[1]
    }
    else {
      if (step3.length === 1 && step3[0] === ``) {
        photoDetails.city_state = step2
        step4 = null
      }
      else {
        step4 = step3[0]
      }
    }


    if (step4 !== null) {
      photoDetails.city_state = step4
    }


    return photoDetails
  }

  getLocations(photos) {
    return photos.map(this.getLocation)
  }

  getLocationsByProp(photos) {
    const city_state_map = {}

    const locationsByProp = photos.reduce((locationsByProp, photo) => {
      const photoDetails = this.getLocation(photo)

      if (photoDetails.topic) {
        locationsByProp.topics.push(photoDetails)
      }
      if (photoDetails.location) {
        locationsByProp.locations.push(photoDetails)
      }

      if (!city_state_map.hasOwnProperty(photoDetails.city_state)) {
        city_state_map[photoDetails.city_state] = []
      }
      city_state_map[photoDetails.city_state].push(photoDetails)

      locationsByProp.all.push(photoDetails)

      return locationsByProp
    }, { topics: [], locations: [], city_state: [], all: [] })

    // Sort by the city names, return an array items for each city
    locationsByProp.city_state = Object.keys(city_state_map).sort().map(city_state => city_state_map[city_state])

    return locationsByProp
  }

}

export default new PhotoSource(process.env.REACT_APP_API_KEY)
