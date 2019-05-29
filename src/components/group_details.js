import React from 'react'

import Task from './task.js'

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskDependencies: this.groupDependencies(this.props.allTasks),
    };

    //This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ taskDependencies: this.groupDependencies(this.props.allTasks) });
  }

  groupDependencies(tasks) {
    let dependencies = {}

    for (let task in tasks) {
      let currTaskObj = tasks[task];
      let currTaskId = currTaskObj.id;
      let currTaskDependencies = currTaskObj.dependencyIds;
      dependencies[currTaskId] = currTaskDependencies;
    }
    return dependencies;
  }

  areDepsComplete(id) {
    if (this.state.taskDependencies[id] === []) {
      return true;
    }

    else {
      for (let i = 0; i < this.state.taskDependencies[id].length; i++) {
        let currDependency = this.state.taskDependencies[id][i];

        if (this.props.allTasks[currDependency].completedAt === null) {
          return false;
        }
      }
      return true;
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.props.backToOverview();
  }

  renderTasks(groupTasks) {
    return groupTasks.map((task, index) => {
      let taskId = task["id"];
      let taskInfo = this.props.groupTasks[index];
      let isComplete = taskInfo.completedAt === null ? false : true;
      let dependentTasksCompleted = this.areDepsComplete(taskId);

      return <Task 
              taskInfo={taskInfo}
              isComplete={isComplete} 
              isLocked={!dependentTasksCompleted}
              dependentTasksCompleted={dependentTasksCompleted} 
              markComplete={this.props.taskCompleted} 
              markIncomplete={this.props.taskIncompleted}
              key={taskId} 
             />
    })
  }

  render() {
    let { groupName, groupTasks } = this.props;

    return (
      <div>
        <a className="Overview_Link" href="/" onClick={this.handleClick}>ALL GROUPS</a>
        <h2 className="Section">{groupName}</h2>
        {this.renderTasks(groupTasks)}
      </div>
    );
  }
}

export default Details