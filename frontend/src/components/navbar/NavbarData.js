import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';

export const NavbarData = [
  {
    title: 'Inicio',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Fiestas',
    path: '/parties',
    icon: <GiIcons.GiPartyHat />,
    cName: 'nav-text'
  },
  {
    title: 'Relacionadores',
    path: '/salespersons',
    icon: <GiIcons.GiTicket />,
    cName: 'nav-text'
  },
  {
    title: 'Clientes',
    path: '/clients',
    icon: <BsIcons.BsPeopleFill />,
    cName: 'nav-text'
  }
];