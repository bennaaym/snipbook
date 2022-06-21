import { ProfileActionType } from "../action-types";
import { IProfile, ProfileAction } from "../actions/profile";

const initialState = {} as IProfile;

const reducer = (
  state: IProfile = initialState,
  { type, payload }: ProfileAction
) => {
  switch (type) {
    case ProfileActionType.FETCH_PROFILE:
      return payload;

    default:
      return state;
  }
};

export default reducer;
