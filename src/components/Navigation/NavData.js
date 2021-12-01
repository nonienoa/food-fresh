const NavBarData = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Pizza',
    path: '/',
    icon: <i className='fas fa-chevron-down'></i>,
    label: 'showdrop2',
    class: 'desktopLink',

    subMenu: [
      {
        title: 'Pizza Sub',
        path: '/',
      },
      {
        title: 'Pizza Sub1',
        path: '/',
      },
    ],
  },
  {
    title: 'Momo',
    path: '/products',
  },
  {
    title: 'Noodles',
    path: '/blog',
  },
  {
    title: 'Chilli',
    path: '/',
  },
  {
    title: 'Sandwwich',
    path: '/',
  },
  {
    title: 'Healthy Choice',
    path: '/',
  },
  {
    title: 'Rice',
    path: '/',
  },
]

export default NavBarData
