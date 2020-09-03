/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `HOTS`,
    description: ``,
    author: `Axis Maps`,
  },
  /* Your site config here */
  plugins: [
    "gatsby-plugin-chakra-ui",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: "http://cms.hots.axismaps.io/graphql",
      },
    },
    `gatsby-plugin-sharp`,
    "gatsby-transformer-sharp",
    `gatsby-plugin-react-helmet`,
  ],
}
