import type { RouteObject } from 'react-router-dom';

import ErrorPage from '@/views/error';
import Layout from '@/layout';
import Home from '@/views/home';
import About from '@/views/about';
import Article from '@/views/article';

export const constantRoutes: RouteObject[] = [
  {
    path: '/error',
    element: <ErrorPage />
  },
  {
    // 没有的页面404
    path: '*',
    element: <ErrorPage />
  }
];

export const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'article/:id',
        element: <Article />
      }
    ]
  }
];

const routers: RouteObject[] = [...constantRoutes, ...mainRoutes];

export default routers;
