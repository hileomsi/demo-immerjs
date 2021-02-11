import { getInitialState } from "./app.state";
// import {
//   addIssue,
//   changeCurrentUser,
//   toggleAssignedIssue,
// } from "./app.reducer";
import {
  addIssue,
  changeCurrentUser,
  toggleAssignedIssue,
} from "./app.reducer.immer";

describe("Should add new issue", () => {
  const initialState = getInitialState();
  const nextState = addIssue(initialState, {
    id: 10,
    title: "New issue",
    assigned: undefined,
  });

  test("Added issue in the collection", () => {
    expect(nextState.issues.length).toBe(8);
  });

  test("Didn't modify the original state", () => {
    expect(initialState.issues.length).toBe(7);
  });

  test("Does structurally share unchanged parts of the state tree", () => {
    expect(initialState).not.toBe(nextState);
    expect(initialState.issues).not.toBe(nextState.issues);
    expect(initialState.currentUser).toBe(nextState.currentUser);
  });
});

describe("Should change current user", () => {
  const initialState = getInitialState();
  const nextState = changeCurrentUser(initialState, "🎩 Augusto Falcao");

  test("Change current user", () => {
    expect(nextState.currentUser).toBe("🎩 Augusto Falcao");
  });

  test("Didn't modify the original state", () => {
    expect(initialState.currentUser).toBe("🐙 Hiléo Andersson");
  });

  test("Does structurally share unchanged parts of the state tree", () => {
    expect(initialState).not.toBe(nextState);
    expect(initialState.currentUser).not.toBe(nextState.currentUser);
    expect(initialState.issues).toBe(nextState.issues);
  });
});

describe("Should toggle the signed issue", () => {
  const initialState = getInitialState();
  const nextState = toggleAssignedIssue(initialState, 0);

  test("Still produces a new issue", () => {
    expect(nextState.issues[0]).toEqual(initialState.issues[0]);
    expect(nextState.issues[0]).toBe(initialState.issues[0]);
  });

  test("Still produces a new state", () => {
    expect(nextState).toEqual(initialState);
    expect(nextState).toBe(initialState);
  });

  test("Can't accidentally modify the produced state", () => {
    expect(() => {
      nextState.issues[0].assigned = undefined;
    }).toThrow();
  });

  test("Toggle assigned issue", () => {
    expect(nextState.issues[0].assigned).toBe("🎩 Augusto Falcão");
  });

  test("Didn't modify the original state", () => {
    expect(initialState.issues[0].assigned).toEqual("🎩 Augusto Falcão");
  });
});
