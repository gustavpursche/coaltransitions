const proxy = require('http-proxy-middleware');
const config = require('./config.json');

module.exports = {
  siteMetadata: {
    siteUrl: 'https://coaltransitions.org',
    title: 'Coal Transitions',
    menu: [
      ['Findings', '/findings/'],
      ['Publications', '/publications/'],
      ['About', '/about/']
    ],
    footer: [
      ['Imprint', '/imprint/'],
      ['Contact', '/contact/'],
      ['Privacy', '/privacy/']
    ],
    twitter: {
      screen_name: 'CoalTransitions',
      count: 100,
      exclude_replies: true
    }
  },

  plugins: [
    {
      resolve: 'gatsby-source-wordpress-experimental',
      options: {
        url: config.endpoint,
        auth: {
          htaccess: {
            username: config.auth_username,
            password: config.auth_password
          }
        }
      }
    },

    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /static\/logos|icons|strokes/
        }
      }
    },

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'CoalTransitions | Research Hub',
        short_name: 'CoalTransitions',
        start_url: '/',
        background_color: '#0D47A1',
        theme_color: 'white',
        display: 'standalone',
        icon: './static/favicon-200.png',
        legacy: false
      }
    },

    'gatsby-plugin-styled-jsx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-advanced-sitemap',
    'gatsby-plugin-preact'
  ],

  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000'
      })
    );
  }
};
