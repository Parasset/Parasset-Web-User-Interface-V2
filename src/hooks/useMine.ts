import { useContext } from 'react';
import { Context as MinesContext } from '../contexts/Mines';
import { Mine, ContractName } from '../basis-cash';

const useMine = (contractName: ContractName): Mine => {
  const { mines } = useContext(MinesContext);
  return mines.find((mine) => mine.contract === contractName);
};

export default useMine;
