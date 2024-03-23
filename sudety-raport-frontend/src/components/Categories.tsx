import React from 'react';
import * as FaIcons from 'react-icons/fa';

export const Categories: {
  [key: string]: Array<{
    title: string,
    path: string,
    icon: JSX.Element,
    cName: string,
    id: number
  }>
} = {
  en: [
    {
      title: 'Best of',
      path: '/best_of',
      icon: <FaIcons.FaAngrycreative />,
      cName: 'nav-text',
      id: 27,
    },
    {
      title: 'Playlists',
      path: '/playlists',
      icon: <FaIcons.FaAd />,
      cName: 'nav-text',
      id: 23,
    },
    {
      title: 'Rap Tales',
      path: '/rap-tales',
      icon: <FaIcons.FaAngrycreative />,
      cName: 'nav-text',
      id: 17,
    },
    {
      title: 'Rap Weekly',
      path: '/rap_weekly',
      icon: <FaIcons.FaAdversal />,
      cName: 'nav-text',
      id: 19,
    },
    {
      title: 'Uncategorized',
      path: '/uncategorized',
      icon: <FaIcons.FaAccessibleIcon />,
      cName: 'nav-text',
      id: 25,
    }
  ],
  cs: [
    {
      title: 'Žebříčky',
      path: '/zebricky',
      icon: <FaIcons.FaAngrycreative />,
      cName: 'nav-text',
      id: 4,
    },
    {
      title: 'Playlisty',
      path: '/playlisty',
      icon: <FaIcons.FaAd />,
      cName: 'nav-text',
      id: 5,
    },
    {
      title: 'Rapové příběhy',
      path: '/rapove-pribehy',
      icon: <FaIcons.FaAngrycreative />,
      cName: 'nav-text',
      id: 3,
    },
    {
      title: 'Rapový týdeník',
      path: '/rapovy_tydenik',
      icon: <FaIcons.FaAdversal />,
      cName: 'nav-text',
      id: 2,
    },
    {
      title: 'Nezařazeno',
      path: '/nezarazeno',
      icon: <FaIcons.FaAccessibleIcon />,
      cName: 'nav-text',
      id: 1,
    }
  ]
}

export const CategoryTranslate: {
  [key: string]: {
    [key: string]: string
  }
} = {
  // en - cz
  'en': {
    'best_of': 'zebricky',
    'playlists': 'playlisty',
    'rap-tales': 'rapove-pribehy',
    'rap_weekly': 'rapovy_tydenik',
    'uncategorized': 'nezarazeno'
  },
  'cs': {
    'zebricky': 'best_of',
    'playlisty': 'playlists',
    'rapove-pribehy': 'rap-tales',
    'rapovy_tydenik': 'rap_weekly',
    'nezarazeno': 'uncategorized'
  }
}

export const LangTranslate: {
  [key: string]: string
} = {
  'cs': 'en',
  'en': 'cs'
}