/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `HOTS`,
    description: ``,
    titleTemplate: '',
    author: `Axis Maps`,
    url: 'https://hots.netlify.app/',
    image: '',
  },
  /* Your site config here */
  plugins: [
    {
      resolve: 'gatsby-plugin-chakra-ui',
      options: {
        /**
         * @property {boolean} [isResettingCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        isResettingCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: false,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ['node_modules/swiper/components/'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: 'http://cms.hots.axismaps.io/graphql',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        typekit: {
          id: 'zou6trd',
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Montserrat:400,500,700`, `News+Cycle:400,700`],
        display: 'swap',
      },
    },
    `gatsby-plugin-open-graph-images`,
    `gatsby-plugin-react-helmet`,
  ],
};
