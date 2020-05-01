# rest-api-mongo
REST api for mongo db using NodeJs &amp; Express

# Descripción
Por mediode NodeJs, es posible realizar un servicio `REST` api para poder utilizar MongoDb.

## Operaciónes disponibles
- `GET`
  - `GET ONE`
  - `GET ALL`
- `POST`
- `PUT`
- `DELETE`

# Notas
  - Para poder hacer un deploy sobre una app de NodeJs, es necesario implementar `pm2`. [url](https://deploybot.com/blog/guest-post-how-to-set-up-and-deploy-nodejs-express-application-for-production)
  - Hay una modificación, siguiente comando es el correcto:
    - `sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u dht --hp /home/dht/node-api-rest-example`
  - Referencia principal: [Tutorial](https://carlosazaustre.es/como-crear-una-api-rest-usando-node-js)