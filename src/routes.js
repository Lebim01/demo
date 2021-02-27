import React from 'react';

const Plans = React.lazy(() => import('./views/plans'))
const FormPlans = React.lazy(() => import('./views/plans_form'))
const Taxes = React.lazy(() => import('./views/taxes'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/plans', exact: true, name: 'Plans', component: Plans, private: true },
  { path: '/plans/form/', exact: true, name: 'Form', component: FormPlans, private: true },
  { path: '/plans/form/:uuid', name: 'Form', component: FormPlans, private: true },
  { path: '/taxes', name: 'Taxes', component: Taxes, private: true },
];

export default routes;