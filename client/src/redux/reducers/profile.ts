import { ProfileActionType } from "../action-types";
import { IProfile, ProfileAction } from "../actions/profile";

export interface IProfileState {
  profile: IProfile;
  isLoading: boolean;
}

const initialState = {
  profile: {} as IProfile,
  isLoading: true,
};

const reducer = (
  state: IProfileState = initialState,
  { type, payload }: ProfileAction
) => {
  switch (type) {
    case ProfileActionType.FETCH_PROFILE:
      return {
        ...state,
        profile: payload,
      };

    case ProfileActionType.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ProfileActionType.END_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
