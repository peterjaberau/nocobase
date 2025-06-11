import { useContext } from 'react';
import { playContext } from '../PlayContext';


const useRootMachine = () => {
  return useContext(playContext);
};

export default useRootMachine;
