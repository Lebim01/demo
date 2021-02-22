import React from 'react';

const Plans = React.lazy(() => import('./views/plans'))
const FormPlans = React.lazy(() => import('./views/plans_form'))
const Taxes = React.lazy(() => import('./views/taxes'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/plans', exact: true, name: 'Plans', component: Plans },
  { path: '/plans/form/', name: 'Form', component: FormPlans },
  { path: '/plans/form/:uuid', name: 'Form', component: FormPlans },
  { path: '/taxes', name: 'Taxes', component: Taxes },
];

export default routes;
