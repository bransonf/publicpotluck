import React from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import axios from 'axios'

const MapView = ReactMapboxGl({
  minZoom: 11,
  maxZoom: 18,
  attributionControl: false,
  accessToken: 'pk.eyJ1IjoiYnJhbnNvbmYiLCJhIjoiY2pub3djb2VlMGV0ZjNrazBzdDJka2xwZCJ9.7ZjFsw_tlQBXqPMcDMCi3g'
})

export class MapboxMap extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      viewport: {
        latitude: -90.2504,
        longitude: 38.6520,
        zoom: [9],
        center: [-90.2504, 38.6520]  // TODO: add user location?
      },
      bounds: [
        [-90.4504, 38.4520], //west, south
        [-90.0504, 38.8520]  //east, north
      ],
      mapStyle: null,
    }
  }

  render() {
    // axios.get('http://api.publicpotluck.com/events/geo?city=St.%20Louis')
    // .then(res => {
    //   console.log(res.data)
    // });
    const { events } = this.props;
    const { viewport, bounds } = this.state;
    return (
      <MapView
        // style="mapbox://styles/bransonf/ck317brnm1nz61dmmtugzjxwv"
        style="mapbox://styles/mapbox/streets-v9"
        center={viewport.center}
        zoom={viewport.zoom}
        // maxBounds={bounds}
        //fitBounds={[[n,n],[n,n]]}
        movingMethod='flyTo'
        //flyToOptions={}
        containerStyle={{height:"calc(100vh - 60px)",width:"100%", overflow:'hidden'}}
        // containerStyle={{position: 'absolute', top: '70px', bottom: 0, width: '100%'}}
      >
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "star-15" }}>
          <Feature coordinates={[-90.283466,38.644081]} />
          <Feature coordinates={[-90.2223874,38.6667982]} />
          <Feature coordinates={[-90.2138657,38.6157046]} />
          <Feature coordinates={[-90.2002909,38.6336407]} />
          <Feature coordinates={[-90.2570502,38.6079207]} />
          
          <Feature coordinates={[-90.283466,38.644081]} />
          <Feature coordinates={[-90.283466,38.644081]} />
          <Feature coordinates={[-90.283466,38.644081]} />
        </Layer>
      </MapView>
    )
  }
}
