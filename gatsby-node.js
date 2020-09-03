const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const makePages = (data, pagePath) => {
    data.forEach((d, i) => {
      const { name } = d;
      createPage({
        path: `${pagePath}/${name.replace(/(\W+)/gm, '-').toLowerCase()}`,
        component: path.resolve(`./src/templates/${pagePath || 'index'}.js`),
        context: d,
      });
      if (i === 0) {
        createPage({
          path: `${pagePath}/`,
          component: path.resolve(`./src/templates/${pagePath || 'index'}.js`),
          context: d,
        });
      }
    });
  };
  const result = await graphql(`
    {
      data: allStatesCsv {
        nodes {
          id
          name
        }
      }
      metadata: allMetadataCsv {
        nodes {
          id
          name: title
          variable
        }
      }
    }
  `);
  const { data, metadata } = result.data;
  makePages(metadata.nodes, '');
  makePages(data.nodes, 'state');
};
