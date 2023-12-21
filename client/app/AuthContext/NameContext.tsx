import { createContext } from 'react';

type UsernameBox = {
  name?: string;
  setName?: (name: string) => void;
}

export const NameContext = createContext<UsernameBox | undefined>(undefined);