import { createContext } from "react";
import { Mine } from "../../abi";

export interface MinesContext {
  mines: Mine[];
}

const context = createContext<MinesContext>({
  mines: [],
});

export default context;
