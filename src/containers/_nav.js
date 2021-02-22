import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Planes',
    to: '/plans',
    icon: <CIcon name="cil-file" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Rendimientos',
    to: '/taxes',
    icon: <CIcon name="cil-calculator" customClasses="c-sidebar-nav-icon"/>,
  },
]

export default _nav
