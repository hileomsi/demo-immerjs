import { createStore } from "redux";
import {
  getInitialState,
  actionsTypes,
  InitialState,
  Issue,
} from "./app.state";

/**
 * Reducers
 */
export const changeCurrentUser = (
  state: InitialState,
  newCurrentUser: string
) => {
  return {
    ...state,
    currentUser: newCurrentUser,
  };
};

export const addIssue = (state: InitialState, issue: Issue) => {
  return {
    ...state,
    issues: [...state.issues, issue],
  };
};

export const toggleAssignedIssue = (state: InitialState, issueId: number) => {
  return {
    ...state,
    issues: state.issues.map((issue) => {
      if (issue.id !== issueId) return issue;

      return {
        ...issue,
        assigned:
          issue.assigned === undefined
            ? state.currentUser
            : issue.assigned === state.currentUser
            ? undefined
            : issue.assigned,
      };
    }),
  };
};

/**
 * App reducer
 */
const appReducer = (state = getInitialState(), { type, payload }: any) => {
  switch (type) {
    case actionsTypes.APP_CHANGE_CURRENT_USER:
      return changeCurrentUser(state, payload);
    case actionsTypes.APP_ADD_ISSUE:
      return addIssue(state, payload);
    case actionsTypes.APP_TOGGLE_ASSIGNED_ISSUE:
      return toggleAssignedIssue(state, payload);
    default:
      return state;
  }
};

/**
 * Store
 */
export const store = createStore(appReducer);
