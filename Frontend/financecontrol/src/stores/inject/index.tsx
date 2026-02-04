import { createContext } from 'react';
import ThemeStore from '../ThemeStore';
import JwtStore from '../JwtStore';
import PeopleStore from '../PeopleStore';

export const StoresContext = createContext({
  themeStore: new ThemeStore(),
  jwtStore: new JwtStore(),
  peopleStore: new PeopleStore()
});
