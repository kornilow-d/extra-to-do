import React from 'react';

import MainLayout from './main';

const Layout: React.FC = ({ children, ...props }) => {
  return <MainLayout {...props}>{children}</MainLayout>;
};

export default Layout;
