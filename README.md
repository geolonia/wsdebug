## 使い方

```
$ npm install
$ npm start
```

以下のように Channel をハッシュで指定する

```
http://localhost:3000/#my-channel
```

または

```
https://geolonia.github.io/wsdebug/#my-channel
```

以下のコマンドを実行

```bash
curl -XPOST \
-d "{\"message\": $(curl -L https://opendata.takamatsu-fact.com/environmental_facilities/data.geojson)}" \
-H 'content-type: application/json' \
'https://api-ws-admin.geolonia.com/dev/channels/my-channel/messages'
```
