import React from 'react';
import ws from './lib/ws'

import './App.scss';

const App = () => {

  const [message, setMessage] = React.useState({});

  React.useEffect(() => {
    ws.addEventListener('open', () => {
      console.log('WebSocket opened')
      ws.send(JSON.stringify({
        action: "subscribe",
        channel: "signage"
      }));
    })

    ws.addEventListener('error', () => {
      console.log('WebSocket error')
    })

    ws.addEventListener('close', () => {
      console.log('WebSocket closed')
    })

    ws.addEventListener('message', (message) => {
      console.log(message.data)
      const rawPayload = JSON.parse(message.data);
      setMessage(rawPayload.msg);
    })
  }, [message])

  return (
    <div className="App">
      <div className="message" data-geolocate-control="on" data-gesture-handling="off"><pre>{JSON.stringify(message, null, '  ')}</pre></div>
    </div>
  );
}

export default App;
