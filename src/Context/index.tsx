import { createContext, useContext } from 'react';

const CustomContext = createContext({
  user: null,
  setUser: null,
});

export function useCustomContext() {
  return useContext(CustomContext);
}

export default CustomContext;
