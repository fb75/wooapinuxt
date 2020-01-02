# WooApiNuxt

> Woocommerce Integration inside Nuxt application

## Build Setup

``` bash
# install dependencies
$ npm install

# create a new Wordpress project and install Woocommerce plugin

# since Woocommerce API plugin requires your local developmet to run under https
# use free ssl util to create a free ssl certificate and let your localhost run under https: 
```
thanks to: [FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)
```bash


# create a new Nuxt.js Universal Server Rendered project on your machine
# during installation choose to use express framework
# copy the new created ssl certificate inside the root folder naming it
# inside the folder api/rootCa.js file see how I genereated the right self signed certificate 

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
