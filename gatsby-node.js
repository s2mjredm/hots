const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      data: allStatesCsv {
        nodes {
          id
          name
          state
        }
      }
      metadata: allIndicatorsCsv {
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
    const indicator = meta.name.replace(/(\W+)/gm, '-').toLowerCase();
    createPage({
      path: `/${indicator}`,
      component: path.resolve('./src/templates/index.js'),
      context: meta,
    });
    if (i === 0) {
      createPage({
        path: '/',
        component: path.resolve('./src/templates/index.js'),
        context: meta,
      });
    }
    data.nodes.forEach(state => {
      const stateName = state.name.replace(/(\W+)/gm, '-').toLowerCase();
      createPage({
        path: `/${indicator}/${stateName}`,
        component: path.resolve('./src/templates/state.js'),
        context: {
          ...meta,
          state: state.state,
        },
      });
    })
  });
};
