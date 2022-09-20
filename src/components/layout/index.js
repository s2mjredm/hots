import React from 'react';
import PropTypes from 'prop-types';

import SEO from '../seo';
import { Script } from "gatsby";
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
      <Script id="hotjarPixel">{`
        (function(h,o,t,j,a,r){
          h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
        h._hjSettings={hjid:3008470,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}</Script>
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
