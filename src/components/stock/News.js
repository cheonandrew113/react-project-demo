import React, { Component } from "react";
import './news.css';

export default class News extends Component {
  render() {
    const { source, author, title, url, urlToImage } = this.props.story;
    // console.log("news:", this.props)
    return (
      <div>
        
          <div id="news">
              <div id="news-cards" className="card horizontal">
                  <img id="news-image" className="image" src={urlToImage}/>
                      <a href={url} target="_blank">
                      <div className="card-stacked">

                          <p id="p-tag"className="card-title">{title}</p>
                      </div>
                  </a>
                  
                  
              </div>
          </div>
      </div>
    );
  }
}
