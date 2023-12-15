import { createContext } from 'react';

type Username = {
  name: string;
}

type UsernameBox = {
  name?: Username[];
  setName?: (name: Username[]) => void;
}

export const NameContext = createContext<UsernameBox>({});