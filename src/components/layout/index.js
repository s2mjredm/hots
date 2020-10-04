import React from 'react';
import PropTypes from 'prop-types';

import SEO from '../seo';
import Header from '../header';
import Footer from '../footer';

const Layout = ({ location: { pathname }, children }) => {
  return (
    <>
      <SEO />
      <Header flag={pathname === '/'} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape(),
};

Layout.defaultProps = {
  location: {
    pathname: null,
  },
};

export default Layout;
