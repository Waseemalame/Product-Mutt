import React from 'react'
import "./About.css"
const About = () => {
  return (
    <>
      <div className="about-container">
        <h2>About Page</h2>
        <p>Product-Mutt is a single-page application clone of <a href="https://www.producthunt.com/">ProductHunt</a></p>
        <p>This website allows users to create posts and showcase their product. Products can be any service users wish to provide</p>
        <p>To create this application, I used React, Javascript, HTML, CSS, Postgres, SQL, Express, and more.</p>
        <br></br><br />
        <h3>Future Implementations</h3>
        <p>I would like to revisit this project and include more functionalities, such as a discussion forum for different topics unrelated to product listings</p>
        <p>I would also like to implement a search feature where users can filter through posts and find what they need faster</p>
        <h5>If you enjoyed this project and would like to connect, find me on Github/LinkedIn</h5>
      </div>
    </>
  )
}

export default About
