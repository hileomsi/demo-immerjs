import * as immer from "immer";
import { createStore } from "redux";
import {
  getInitialState,
  actionsTypes,
  InitialState,
  Issue,
} from "./app.state";

/**
 * Reducers
 * produce(state, recipe) => nextState
 * produce(recipe) => (state, recipe) => nextState
 * immer.original
 */
export const changeCurrentUser = (
  state: InitialState,
  newCurrentUser: string
) => {
  return immer.produce(state, (draftState) => {
    draftState.currentUser = newCurrentUser;
  });
};

export const addIssue = (state: InitialState, issue: Issue) => {
  return immer.produce(state, (draftState) => {
    draftState.issues.push(issue);
  });
};

export const toggleAssignedIssue = (state: InitialState, issueId: number) => {
  return immer.produce(state, (draftState) => {
    const issue = draftState.issues.find((issue) => issue.id === issueId);

    if (!!issue) {
      issue.assigned =
        issue.assigned === undefined
          ? state.currentUser
          : issue.assigned === state.currentUser
          ? undefined
          : issue.assigned;
    }
  });
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

export const store = createStore(appReducer);
