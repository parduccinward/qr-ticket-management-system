import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';

export const NavbarData = [
  {
    title: 'Events',
    path: '/parties',
    icon: <GiIcons.GiPartyHat />,
    cName: 'nav-text'
  },
  {
    title: 'Salespersons',
    path: '/salespersons',
    icon: <GiIcons.GiTicket />,
    cName: 'nav-text'
  },
  {
    title: 'Clients',
    path: '/clients',
    icon: <BsIcons.BsPeopleFill />,
    cName: 'nav-text'
  }
];