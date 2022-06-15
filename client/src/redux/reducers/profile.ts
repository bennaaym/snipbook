import { ProfileActionType } from "../action-types";
import { ProfileAction, ProfileComponent } from "../actions/profile";

interface IState {
  component: ProfileComponent;
}

const initialState: IState = {
  component: ProfileComponent.CREATE_FORM,
};

const reducer = (state: IState = initialState, action: ProfileAction) => {
  switch (action.type) {
    case ProfileActionType.UPDATE_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
