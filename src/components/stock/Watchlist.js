  
import React, { Component } from 'react';

class WatchList extends Component {
    
    state={
        watchList: []
    }

    render() { 
        return ( 
            <div>
                <button>Add to Watchlist</button>
            </div>
         );
    }
}
 
export default WatchList;