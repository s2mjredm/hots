const path = require('path');
const { createOpenGraphImage } = require('gatsby-plugin-open-graph-images');
const { slugify } = require('./src/utils/slugify');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      data: allStatesJson {
        nodes {
          id
          name
          state
        }
      }
      metadata: allIndicatorsJson {
        nodes {
          id
          name: title
          variable
        }
      }
    }
  `);
  const { data, metadata } = result.data;
  metadata.nodes.forEach((meta, i) => {
    const indicator = slugify(meta.name);
    createPage({
      path: `/${indicator}`,
      component: path.resolve('./src/templates/index.js'),
      context: meta,
      ogImage: createOpenGraphImage(createPage, {
        path: `og-images/${indicator}.png`,
        component: path.resolve(`src/templates/og-indicator.js`),
        context: { ...meta },
      }),
    });
    // createPage({
    //   path: `/og/${indicator}`,
    //   component: path.resolve(`src/templates/og-indicator.js`),
    //   context: { ...meta },
    // });
    if (i === 0) {
      createPage({
        path: '/',
        component: path.resolve('./src/templates/index.js'),
        context: meta,
        ogImage: createOpenGraphImage(createPage, {
          path: `og-images/default.png`,
          component: path.resolve(`src/templates/og-indicator.js`),
          context: { ...meta },
        }),
      });
    }
    data.nodes.forEach(state => {
      const stateName = slugify(state.name);
      createPage({
        path: `/${indicator}/${stateName}`,
        component: path.resolve('./src/templates/state.js'),
        context: {
          ...meta,
          state: state.state,
          ogImage: createOpenGraphImage(createPage, {
            path: `og-images/${indicator}/${stateName}.png`,
            component: path.resolve(`src/templates/og-state.js`),
            context: {
              ...meta,
              state: state.state,
            },
          }),
        },
      });
      // createPage({
      //   path: `/og/${indicator}/${stateName}`,
      //   component: path.resolve(`src/templates/og-state.js`),
      //   context: {
      //     ...meta,
      //     state: state.state,
      //   },
      // });
    });
  });
};
