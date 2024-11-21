import React from 'react';
import ws from './lib/ws'

import './App.scss';
import { useRouteLoaderData } from 'react-router-dom';

let channel = 'ws'

if (window.location.hash && window.location.hash.slice(1)) {
  channel = window.location.hash.slice(1)
}

window.addEventListener('hashchange', () => {
  window.location.reload()
})

const App = () => {
  const [message, setMessage] = React.useState({});

  React.useEffect(() => {
    ws.addEventListener('open', () => {
      console.log(`WebSocket opened at ${channel}`)

      ws.send(JSON.stringify({
        action: "subscribe",
        channel: channel
      }));
    })

    ws.addEventListener('error', () => {
      console.log('WebSocket error')
    })

    ws.addEventListener('close', () => {
      console.log('WebSocket closed')
    })

    ws.addEventListener('message', (message) => {
      const rawPayload = JSON.parse(message.data);
      setMessage(rawPayload);
    })
  }, [channel])

  return (
    <div className="App">
      <div className="message" data-geolocate-control="on" data-gesture-handling="off"><pre>{JSON.stringify(message, null, '  ')}</pre></div>
    </div>
  );
}

export default App;
