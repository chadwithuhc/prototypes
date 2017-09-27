class BlogSource {

  constructor(API_KEY) {
    this.API_KEY = API_KEY
    this.API_KEY_URI = 'api_key=' + API_KEY
    this.API_BASE_URL = 'https://api.tumblr.com/v2'
    console.log(this)
  }

  getPosts(user = 'chad-ly') {
    return fetch(`${this.API_BASE_URL}/blog/${user}.tumblr.com/posts?tag=public+faces&${this.API_KEY_URI}`)
    .then(res => res.json())
    .then((data) => {
      return data.response.posts
    })
  }

}
console.log(process.env)
export default new BlogSource(process.env.REACT_APP_API_KEY)
