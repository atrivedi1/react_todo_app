import React from 'react'

import groupArrow from '../assets/group.svg'

class Group extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupTasks: this.breakOutTasksById(this.props.groupTasks),
      completedGroupTasks: this.completedTasks(this.props.groupTasks),
    };

    //This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ groupTasks: this.breakOutTasksById(this.props.groupTasks) });
    this.setState({ completedGroupTasks: this.completedTasks(this.props.groupTasks) });
  }

  breakOutTasksById(tasks) {
    let tasksById = {}

    for(let i = 0; i < tasks.length; i++) {
      let currTask = tasks[i];
      let currTaskId = currTask["id"];
      tasksById[currTaskId] = currTask;
    }

    return tasksById;
  }

  completedTasks(tasks) {
    return tasks.filter((task) => {
      return task.completedAt !== null;
    }).length;
  }

  handleClick() {
    this.props.selectGroup(this.props.groupName)
  }

  render() {
    let { groupName } = this.props;

    return (
      <div className="Section">
        <img className="Group_Image" alt="" src={groupArrow} onClick={this.handleClick}/>
        <h3 className="Group_Title">{groupName}</h3>  
        <h4 className="Group_Status">{`${this.state.completedGroupTasks} OF ${Object.keys(this.state.groupTasks).length} TASKS COMPLETE`}</h4>
      </div>
    );
  }
}

export default Group