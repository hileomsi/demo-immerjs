/**
 * InitialState
 */
export interface Issue {
  id: number;
  title: string;
  assigned?: string;
}
export interface InitialState {
  currentUser: string;
  issues: Array<Issue>;
}
export const getInitialState = (): InitialState => ({
  currentUser: "🐙 Hiléo Andersson",
  issues: [
    { id: 0, title: "Create order module", assigned: "🎩 Augusto Falcão" },
    {
      id: 1,
      title:
        "Allow to share orders. This can be done via the API adding collaborator support",
      assigned: undefined,
    },
    {
      id: 2,
      title: "Expand all the sidebar sections by default",
      assigned: undefined,
    },
    { id: 3, title: "Safari sections are bugging", assigned: undefined },
    {
      id: 4,
      title:
        "Modify order vendor to support multiple vendors extracted from smartscout users",
      assigned: "🚀 Nelson Eldoro",
    },
    {
      id: 5,
      title: "Add default date range in Period section",
      assigned: "🚀 Nelson Eldoro",
    },
    {
      id: 6,
      title: "Add panel to cart through the table item",
      assigned: "🎩 Augusto Falcão",
    },
  ] as Array<Issue>,
});

/**
 * Actions Types
 */
const APP_CHANGE_CURRENT_USER = "APP_CHANGE_CURRENT_USER";
const APP_ADD_ISSUE = "APP_ADD_ISSUE";
const APP_TOGGLE_ASSIGNED_ISSUE = "APP_TOGGLE_ASSIGNED_ISSUE";

export const actionsTypes = {
  APP_CHANGE_CURRENT_USER,
  APP_ADD_ISSUE,
  APP_TOGGLE_ASSIGNED_ISSUE,
};

/**
 * Actions
 */
const changeCurrentUser = (newCurrentUser: string) => {
  return {
    type: APP_CHANGE_CURRENT_USER,
    payload: newCurrentUser,
  };
};

const addIssue = (issue: Issue) => {
  return {
    type: APP_ADD_ISSUE,
    payload: issue,
  };
};

const toggleAssignedIssue = (issueId: number) => {
  return {
    type: APP_TOGGLE_ASSIGNED_ISSUE,
    payload: issueId,
  };
};

export const actions = {
  changeCurrentUser,
  addIssue,
  toggleAssignedIssue,
};
