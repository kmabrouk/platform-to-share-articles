import React from "react";
import "./About.css";
import img from "./img-home.jpg";

function About() {
  return (
    <div className="about">
      <div className="Aboutcontainer" style={{ backgroundImage: `url(${img})` }}>
        <div className="app-wrapper">
          <div className="aboutBottom">
            <h1> ABOUT US</h1>
            <p>
              The best ideas can change who we are. WOK is where those ideas
              take shape, take off, and spark powerful conversations. We’re an
              open platform where over 100 million readers come to find
              insightful and dynamic thinking. Here, expert and undiscovered
              voices alike dive into the heart of any topic and bring new ideas
              to the surface. Our purpose is to spread these ideas and deepen
              understanding of the world. We’re creating a new model for digital
              publishing. One that supports nuance, complexity, and vital
              storytelling without giving in to the incentives of advertising.
              It’s an environment that’s open to everyone but promotes substance
              and authenticity. And it’s where deeper connections forged between
              readers and writers can lead to discovery and growth. Together
              with millions of collaborators, we’re building a trusted and
              vibrant ecosystem fueled by important ideas and the people who
              think about them. Anyone can write on WOK. Thought-leaders,
              journalists, experts, and individuals with unique perspectives
              share their thinking here. You’ll find pieces by independent
              writers from around the globe, stories we feature and leading
              authors, and smart takes on our own suite of blogs and
              publications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
