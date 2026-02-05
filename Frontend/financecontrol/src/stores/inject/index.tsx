import { createContext } from 'react';
import ThemeStore from '../ThemeStore';
import JwtStore from '../JwtStore';
import PeopleStore from '../PeopleStore';
import CategoryStore from '../CategoryStore';
import TransactionStore from '../TransactionStore';
import DashboardStore from '../DashboardStore';
import ReportStore from '../ReportStore';

export const StoresContext = createContext({
  themeStore: new ThemeStore(),
  jwtStore: new JwtStore(),
  categoryStore: new CategoryStore(),
  transactionStore: new TransactionStore(),
  dashboardStore: new DashboardStore(),
  reportStore: new ReportStore(),
  peopleStore: new PeopleStore()
});
