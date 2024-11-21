import React from 'react';
import ws from './lib/ws'
import geojsonExtent from '@mapbox/geojson-extent';

import './App.scss';

declare global {
  interface Window {
    geolonia: any;
  }
}

let channel = 'my-channel'

let geojson = {
  "type": "FeatureCollection",
  "features": []
}

if (window.location.hash && window.location.hash.slice(1)) {
  channel = window.location.hash.slice(1)
}

window.addEventListener('hashchange', () => {
  window.location.reload()
})

const App = () => {
  const [update, setUpdata] = React.useState<boolean>(false)
  const [geojson, setGeojson] = React.useState({
    "type": "FeatureCollection",
    "features": []
  })

  const mapContainer = React.useRef(null);
  const geojsonContainer = React.useRef(null);

  React.useEffect(() => {
    const map = new window.geolonia.Map({
      container: mapContainer.current,
      center: [139.741414, 35.658011],
      zoom: 10,
      // hash: true,
      style: "geolonia/gsi",
    });

    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({
        action: "subscribe",
        channel: channel
      }));
    })

    map.on('load', () => {
      const ss = new window.geolonia.simpleStyle({
        "type": "FeatureCollection",
        "features": []
      }, { id: 'geojson' }).addTo(map)

      ws.addEventListener('message', (message) => {
        const rawPayload = JSON.parse(message.data);
        const geojson = rawPayload.msg;
        if (geojson) {
          const bounds = geojsonExtent(geojson)
          ss.updateData(geojson)
          map.fitBounds(bounds, { padding: 100 })
        }
      })
    })

  }, [mapContainer, channel])

  return (
    <div className="App">
      <script id="geojson" ref={geojsonContainer} type="application/json">{JSON.stringify(geojson)}</script>
      <div className="map" ref={mapContainer} data-geolocate-control="on" data-gesture-handling="off" data-geojson="#geojson"></div>
    </div>
  );
}

export default App;
