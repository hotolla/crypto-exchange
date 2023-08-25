import { IUser } from '../../../../ToDoList/src/modules/users/IUser';
import { IAuthState } from './initialState';
import { Types } from './types';

export type Action =
  | { type: Types.Login; payload: IUser }

export const reducer = (state: IAuthState, { type, payload }: Action) => {
  switch (type) {
  case Types.Login:
    return {
      ...state,

      isAuthenticated: true,
      user: payload
    };

  default:
    return state;
  };
};
