
import * as React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {actions, InitialState, Issue} from './app.state';
import {store} from './app.reducer';
// import {store} from './app.reducer.immer';

/**
 * Header
 */
interface HeaderProps {
  currentUser: string,
  addIssue: () => void
  changeUserCurrent: (event: React.ChangeEvent<HTMLSelectElement>) => void
};      
const Header = React.memo((props: HeaderProps) => {
  return (
    <div className="Header">
      <select value={props.currentUser} onChange={props.changeUserCurrent}>
        <option>🐙 Hiléo Andersson</option>
        <option>🎩 Augusto Falcão</option>
        <option>🚀 Nelson Eldoro</option>
      </select>
      <button onClick={props.addIssue}>New issue</button>
    </div>
  );
});

/**
 * IssueItem
 */
interface IssueItemPros {
  issue: Issue,
  toggleAssigned: (issueId: number) => void
}
const IssueItem = React.memo((props: IssueItemPros) => {
  return (
    <li className="IssueItem">
      <div>
        <div className={`IssueItem-Title ${!!props.issue.assigned ? 'IssueItem-TitleAssigned' : ''}`}>{props.issue.title}</div>
        <div className="IssueItem-Assigned">{props.issue.assigned || '😢 Get this issue, please'}</div>
      </div>
      <div>
        <button onClick={() => props.toggleAssigned(props.issue.id)}>
          {!props.issue.assigned ? 'Assign' : 'Unassign'}
        </button>
      </div>
    </li>
  );
});

/**
 * IssuesList
 */
interface IssuesListProps {
  issues: Issue[],
  toggleAssigned: (issueId: number) => void
}
const IssuesList = React.memo((props: IssuesListProps) => {
  return (
    <div className="IssuesList">
      <ul>
        {props.issues.map(issue => (
          <IssueItem
            key={issue.id}
            issue={issue}
            toggleAssigned={props.toggleAssigned}
          />
        ))}
      </ul>
    </div>
  );
});

/**
 * Application
 */
const useApp = () => {
  /**
   * State
   */
  const currentUser = useSelector<InitialState, string>(state => state.currentUser);
  const issues = useSelector<InitialState, Issue[]>(state => state.issues);

  const dispatch = useDispatch();

  /**
   * Handles
   */
  const handleChangeUserCurrent = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const userName: string = event.target.value;
    dispatch(actions.changeCurrentUser(userName));
  }, [dispatch]);

  const handleAddIssue = React.useCallback(() => {
    const description = prompt('Issue to add');
    if (description) {
      const issue: Issue = {
        // Random number
        id: Math.round( Math.random() * 1000 % 1000 ),
        title: description,
        assigned: undefined
      };
      dispatch(actions.addIssue(issue));
    }
  }, [dispatch]);

  const handleToggleAssigned = React.useCallback((issueId: number) => {
    dispatch(actions.toggleAssignedIssue(issueId));
  }, [dispatch]);

  return [currentUser, issues, handleChangeUserCurrent, handleAddIssue, handleToggleAssigned] as const;
};

const App = () => {
  const [
    currentUser,
    issues,
    handleChangeUserCurrent,
    handleAddIssue,
    handleToggleAssigned
  ] = useApp();
  

  return (
    <div className="App">
      <Header
        currentUser={currentUser}
        addIssue={handleAddIssue}
        changeUserCurrent={handleChangeUserCurrent}
      />
      <IssuesList
        issues={issues}
        toggleAssigned={handleToggleAssigned}
      />
    </div>
  )
};

export default () => {
  return <Provider store={store}>
    <App />
  </Provider>
};
