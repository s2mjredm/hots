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
    url: '',
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
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `News Cycle`,
            variants: [`400`, `700`],
          },
          {
            family: `Montserrat`,
            variants: [`400`, `500`, `700`],
          },
        ],
      },
    },
    `gatsby-plugin-open-graph-images`,
    `gatsby-plugin-react-helmet`,
  ],
};
