import React from 'react';
import PropTypes from 'prop-types';

import SEO from '../seo';
import Header from '../header';
import Footer from '../footer';

const Layout = ({ location: { pathname }, children, ogImage, description }) => {
  return (
    <>
      <SEO
        description={description}
        image={
          ogImage && pathname ? `og-images${pathname.replace(/\/$/, '') || 'default'}.png` : null
        }
      />
      <Header flag={pathname === '/'} />
      <main style={{ color: ' #403f3f' }}>{children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape(),
  ogImage: PropTypes.bool,
  description: PropTypes.string,
};

Layout.defaultProps = {
  location: {
    pathname: null,
  },
  ogImage: false,
  description: null,
};

export default Layout;
