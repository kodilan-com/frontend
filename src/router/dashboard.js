const dashboardRoutes = [
  {
    path: '',
    redirect: 'profil',
  },
  {
    path: 'profil',
    component: () => import('../components/pages/dashboard/Profile'),
  },
  {
    path: 'firmalarim',
    component: () => import('../components/pages/dashboard/MyCompanies'),
  },
  {
    path: 'firmalarim/ekle',
    component: () => import('../components/pages/dashboard/CompanyForm'),
  },
  {
    path: 'firmalarim/:companyId/duzenle',
    component: () => import('../components/pages/dashboard/CompanyForm'),
  },
  {
    path: 'firmalarim/:companyId/kullanicilar',
    component: () => import('../components/pages/dashboard/CompanyUsers'),
  },
  {
    path: 'ilanlarim',
    component: () => import('../components/pages/dashboard/MyPosts'),
  },
  {
    path: 'ilanlarim/ekle',
    component: () => import('../components/pages/dashboard/PostForm'),
  },
  {
    path: 'ilanlarim/:postId/duzenle',
    component: () => import('../components/pages/dashboard/PostForm'),
  },
];

export default dashboardRoutes;
