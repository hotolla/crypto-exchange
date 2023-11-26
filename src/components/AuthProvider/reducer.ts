import { IUser } from '@/modules/users';
import { IAuthState, initialState } from './initialState';
import { Types } from './types';

export type Action =
  | { type: Types.Login; payload: IUser }
  | { type: Types.Logout; payload: IAuthState }

export const reducer = (state: IAuthState, { type, payload }: Action) => {
  switch (type) {
    case Types.Login:
      return {
        ...state,
        ...payload,

        isAuthenticated: true
      };

    case Types.Logout:
      return initialState;

    default:
      return state;
  }
};
