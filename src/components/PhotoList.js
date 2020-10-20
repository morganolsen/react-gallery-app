import React from 'react';

import { Consumer } from './Context';
import Photo from './Photo';
import NotFound from './NotFound';

/**
 * Performs the search if it's not already performed, then
 * displays the results on the page.
 * Uses a consumer to retreive the data from the provider.
 */

const PhotoList = ({match}) => {

    return(
        <Consumer>
            { ({data, resultsLoaded, query, actions}) => {
                    if(match.params.searchTerm !== query){
                        resultsLoaded = false;
                        actions.performSearch(match.params.searchTerm);
                    }
                    /**
                     * Shows a loading screen until the pictures are displayed.
                     */
                    if(!resultsLoaded){
                        return(
                            <div>
                                <h2>Loading...</h2>
                            </div>
                        );
                    }
                    let photoList = (<NotFound />);
                    if(data.length){
                        photoList = data.map(photo => {
                            const url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                            return(
                                <Photo url={url} alt={photo.title} key={photo.id} />
                            );
                        });
                    }
                    return(
                        <div className="photo-container">
                            <h2>{query}</h2>
                            <ul>
                                {photoList}
                            </ul>
                        </div>
                    );
                
                }
            }
        </Consumer>
        
    );
}

export default PhotoList;