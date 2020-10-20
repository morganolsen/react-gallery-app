import React, { Component } from 'react';

import apiKey from './../../config/';

const Context = React.createContext();

/**
 * Provider that handles the fetching and storing of data.
 */

export class Provider extends Component {
    
    state = {
        data: [],
        query: "",
        resultsLoaded: false
    }

    /**
     * Fetches 24 pictures from the flickr API based on the given query
     * 
     * @param {string} query - The string to search for.
     */
    performSearch(query) {
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
            .then(result => result.json())
            .then(json => {
                this.setState({
                    data: json.photos.photo,
                    query: query
                });
            })
            .catch(err => {
                console.error("Unable to fetch images.", err);
            })
            .finally(() => {
                this.setState({
                    resultsLoaded: true
                });
            });
    }
    
    render() {
        return(
            <Context.Provider value={{
                data: this.state.data,
                resultsLoaded: this.state.resultsLoaded,
                query: this.state.query,
                actions: {
                    performSearch: this.performSearch.bind(this)
                }
              }}>
                  { this.props.children }
              </Context.Provider>
        );
    }
}
export const Consumer = Context.Consumer;