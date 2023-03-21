import { createContext, useContext } from 'react';

const CustomContext = createContext();

export function useCustomContext(): void {
  return useContext(CustomContext);
}

export default CustomContext;
