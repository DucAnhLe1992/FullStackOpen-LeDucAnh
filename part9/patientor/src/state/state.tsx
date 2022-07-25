import React, { createContext, useContext, useReducer } from "react";
import { Patient, Gender } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient | undefined };
  patient: Patient;
};

const initialState: State = {
  patients: {},
  patient: {
    id: "",
    name: "",
    occupation: "",
    gender: Gender.Other,
    ssn: "",
    dateOfBirth: "",
    entries: [],
  },
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
