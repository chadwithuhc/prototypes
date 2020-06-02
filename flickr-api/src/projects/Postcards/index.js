import React from 'react'
import './index.css'

// import umbrella from './svgs/umbrella.js'

const EasingFunctions = {
  // no easing, no acceleration
  linear: t => t,
  // accelerating from zero velocity
  easeInQuad: t => t*t,
  // decelerating to zero velocity
  easeOutQuad: t => t*(2-t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
  // accelerating from zero velocity 
  easeInCubic: t => t*t*t,
  // decelerating to zero velocity 
  easeOutCubic: t => (--t)*t*t+1,
  // acceleration until halfway, then deceleration 
  easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
  // accelerating from zero velocity 
  easeInQuart: t => t*t*t*t,
  // decelerating to zero velocity 
  easeOutQuart: t => 1-(--t)*t*t*t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
  // accelerating from zero velocity
  easeInQuint: t => t*t*t*t*t,
  // decelerating to zero velocity
  easeOutQuint: t => 1+(--t)*t*t*t*t,
  // acceleration until halfway, then deceleration 
  easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
}

function WaningText({ children, diff = 1.8, steps = 6, direction = 'desc', valign = 'start' }) {
  const chars = Array.isArray(children) ? children : children.split('')
  const sizes = calcSizes(steps)
  const lineHeight = Math.max(...sizes)

  function calcSizes(size) {
    const sizes = []
    while (size) {
      // sizes.push(size * diff)
      sizes.push(size * diff)
      size--
    }
    
    if (direction === 'asc') {
      sizes.reverse()
    }

    return sizes
  }

  return (
    <span style={{
        display:'flex',
        alignItems: valign,
        lineHeight:`${lineHeight}rem`
      }}>
      {chars.map((value, size) => <span key={size} style={{
        fontSize:`${sizes[size] || 1}rem`,
        lineHeight:`${sizes[size] || 1}rem`,
        letterSpacing: `-${sizes[size] * 0.1}rem`,
        // marginTop: `${size * 0.3}rem`
        // verticalAlign: 'text-bottom'
      }}>{value}</span>)}
    </span>
  )
}

function UCFirst({ children, fontSize = 2, diff = 0.65 }) {
  const chars = Array.isArray(children) ? children : children.split('')

  return (
    <span style={{
        display: 'flex',
        alignItems: 'start',
        // lineHeight: `${fontSize}em`,
        verticalAlign: 'text-top',
        letterSpacing: `-0.1em`
      }}>
      {chars.map((value, size) => <span key={size} style={{
        fontSize:`${size > 0 ? fontSize * diff : fontSize}em`,
        marginTop: size > 0 ? '0em' : '-0.1em',
        letterSpacing: size > 0 ? '-0.1em' : `-0.08em`,
        // verticalAlign: 'text-bottom'
      }}>{value}</span>)}
    </span>
  )
}

class Postcards extends React.Component {

  render() {
    return (
      <main className="postcards">

        <figure className="postcard boulder-retro">
          <img src="https://farm66.staticflickr.com/65535/49964727077_e2520ac4d8_b.jpg" width="800" alt="Flatirons in Boulder, CO" />
          <figcaption className="title">
            <UCFirst>BOULDER</UCFirst>
            <span className="subtitle">COLORADO</span>
          </figcaption>
        </figure>

        <figure className="postcard ridges">
          <img src="https://farm5.staticflickr.com/4205/35382100091_43a893d4dc_c.jpg" width="800" height="486" alt="Ridges in Rifle, CO" className="poster" />
          <figcaption className="title">Ridges <span>in</span> Rifle, CO</figcaption>
        </figure>

        <figure className="postcard editorial">
          <img src="https://farm5.staticflickr.com/4203/34961490322_a5aedefcb6_c.jpg" width="800" height="428" alt="Arapaho National Forest, CO" />
          <figcaption className="title">Arapaho National Forest, CO</figcaption>
        </figure>

        <figure className="postcard stoic">
          <img src="https://farm5.staticflickr.com/4281/35354764461_056c764755_c.jpg" width="800" height="426" alt="Moraine Park Valley in Rocky Mountain National Park, CO" />
          <figcaption className="title">Moraine Park Valley <span className="subtitle">Rocky Mountain National Park</span></figcaption>
        </figure>

        <figure className="postcard riverfront-retro">
          <img src="https://farm5.staticflickr.com/4159/34544333765_7f877a7b27_b.jpg" width={1024*.75} height={768*.75} alt="Spring at Riverfront Park in Denver, CO" />
          <figcaption className="title"><umbrella /> Riverfront Park</figcaption>
        </figure>

        <figure className="postcard retro">
          <img src="https://farm5.staticflickr.com/4214/35495560005_b1475a49af_c.jpg" width="800" height="408" alt="Phantogram Crowds at RiNo in Denver, CO" />
          <figcaption className="title">RiNo <small>Arts District</small></figcaption>
        </figure>

        <figure className="postcard classic-retro">
          <img src="https://farm2.staticflickr.com/1950/31428771368_1e56f7b257_b.jpg" alt="Skyline in Denver, CO" width={1024*.75} height={768*.75} />
          <figcaption className="title">Denver</figcaption>
        </figure>

        
        {/* <figure className="postcard proto">
          <img src="https://farm5.staticflickr.com/4273/34484249943_f18c8d2627_c.jpg" width="800" height="600" alt="Road Curves at Moraine Park Valley in Rocky Mountain National Park, CO" />
          <figcaption className="title">Rocky Mountain National Park, CO</figcaption>
        </figure>

        <figure className="postcard proto">
          <img src="https://farm5.staticflickr.com/4213/35288215526_7a5c65cc0d_c.jpg" width="800" height="600" alt="Rainbow Curves at Trail Ridge Road in Rocky Mountain National Park, CO" />
          <figcaption className="title">Trail Ridge Road</figcaption>
        </figure> */}
        

      </main>
    )
  }

}

export default Postcards
