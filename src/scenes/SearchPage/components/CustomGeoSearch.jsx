import React from 'react';
import { GoogleMapsLoader, GeoSearch, Marker } from 'react-instantsearch-dom-maps';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import CustomEventItem from './CustomEventItem';

const CustomGeoSearch = (props) => (
    <GoogleMapsLoader apiKey="AIzaSyDZHQdnlyuo3spiKtfixH818xkohVXExh8">
        {(google) => {
            // Marker's onClick Window
            const InfoWindow = new google.maps.InfoWindow();
            const onClickMarker = ({ hit, marker }) => {
                if (InfoWindow.getMap()) InfoWindow.close();
                const content = ReactDOMServer.renderToString(
                    <div style={{ minWidth: 400 }}>
                        <CustomEventItem
                            id={hit.objectID}
                            name={hit.name}
                            description={hit.description}
                            image={hit.image}
                            date={hit.date ? new Date(hit.date).toISOString() : ''}
                            hoverZoom={false}
                        />
                    </div>,
                );
                InfoWindow.setContent(content);
                InfoWindow.open(marker.getMap(), marker);
            };
            if (props.open)
                return (
                    <GeoSearch google={google} enableRefineOnMapMove={false} maxZoom={15} minZoom={8}>
                        {({ hits }) =>
                            hits.map((hit) => (
                                <Marker
                                    key={hit.objectID}
                                    hit={hit}
                                    onClick={({ marker }) => {
                                        onClickMarker({
                                            hit,
                                            marker,
                                        });
                                    }}
                                />
                            ))
                        }
                    </GeoSearch>
                );
            return null;
        }}
    </GoogleMapsLoader>
);

CustomGeoSearch.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default CustomGeoSearch;
