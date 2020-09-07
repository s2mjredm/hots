import React from 'react';
import PropTypes from 'prop-types';

import SEO from '../seo';
import Header from '../header';
import Footer from '../footer';

const Layout = ({ children }) => (
  <>
    <SEO />
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
