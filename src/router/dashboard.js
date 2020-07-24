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
];

export default dashboardRoutes;
