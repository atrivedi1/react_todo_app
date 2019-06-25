import React from 'react'
import task_data from "../data.json";
import Overview from './Overview.js'
import Details from './GroupDetails.js'

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //task objects by group
      groups: this.groupInitialTasksByGroup(task_data),
      //task objects by id
      allTasks: this.hashTasks(task_data),
      //dependents task id to array of task ids
      dependents: this.findDependents(task_data),
      selectedGroup: null
    };

    this.selectedGroup = this.selectedGroup.bind(this);
    this.taskMarkedAsComplete = this.taskMarkedAsComplete.bind(this);
    this.taskMarkedAsIncomplete = this.taskMarkedAsIncomplete.bind(this);
    this.backToOverview = this.backToOverview.bind(this);
  }

  groupInitialTasksByGroup(tasks) {
    let groups = {}

    for (let i = 0; i < tasks.length; i++) {
      let currTask = tasks[i]
      let currGroup = currTask.group;
      if (!groups[currGroup]) {
        groups[currGroup] = [currTask]
      } else {
        groups[currGroup].push(currTask)
      }
    }

    return groups;
  }

  hashTasks(data) {
    return data.reduce((acc, current) => {
      acc[current.id] = current;
      return acc;
    }, {})
  }

  findDependents(tasks) {
    let dependents = {}

    for (let i = 0; i < tasks.length; i++) {
      let currTaskId = tasks[i].id;
      let currTaskDeps = tasks[i].dependencyIds

      for (let j = 0; j < currTaskDeps.length; j++) {
        let currDep = currTaskDeps[j];

        if (!dependents[currDep]) {
          dependents[currDep] = [currTaskId];
        } else {
          dependents[currDep].push(currTaskId);
        }
      }
    }

    return dependents;
  }

  updateGroupedTasks(allTasks) {
    let updatedTasksGroupedByGroup = {}

    for (let task in allTasks) {
      let taskGroup = allTasks[task].group
      if (!updatedTasksGroupedByGroup[taskGroup]) {
        updatedTasksGroupedByGroup[taskGroup] = [allTasks[task]];
      } else {
        updatedTasksGroupedByGroup[taskGroup].push(allTasks[task])
      }
    }

    this.setState({ groups: updatedTasksGroupedByGroup })
  }

  selectedGroup(groupName) {
    this.setState({ selectedGroup: groupName })
  }

  taskMarkedAsComplete(id, timestamp) {
    let updatedTasks = { ...this.state.allTasks };
    updatedTasks[id].completedAt = timestamp;

    this.setState({ allTasks: updatedTasks }, () => {
      this.updateGroupedTasks(this.state.allTasks)
    });
  }

  taskMarkedAsIncomplete(id) {
    //mark current task as incomplete
    let updatedTasks = { ...this.state.allTasks };
    updatedTasks[id].completedAt = null;

    this.setState({ allTasks: updatedTasks }, () => {
      this.updateGroupedTasks(this.state.allTasks)
    })

    //mark dependents as incomplete
    this.markDependentsAsIncomplete(id);
  }

  markDependentsAsIncomplete(id) {
    if (!this.state.dependents.hasOwnProperty(id) || this.state.dependents[id].length === 0) {
      return;
    }

    let dependents = this.state.dependents[id];

    for (let i = 0; i < dependents.length; i++) {
      let currDependent = dependents[i];
      let updatedTasks = { ...this.state.allTasks };

      //mark current dependent as incomplete
      updatedTasks[currDependent].completedAt = null;

      this.setState({ allTasks: updatedTasks }, () => {
        this.updateGroupedTasks(this.state.allTasks)
      })

      //recursively mark depedents of dependents as incomplete
      this.markDependentsAsIncomplete(currDependent);
    }
  }

  backToOverview() {
    this.setState({ selectedGroup: null })
  }

  renderOverviewOrDetailView() {
    if(this.state.selectedGroup === null) {
      return <Overview
              groups={this.state.groups}
              selectedGroup={this.selectedGroup}
            />
    } else {
      return <Details
                groupName={this.state.selectedGroup}
                allTasks={this.state.allTasks}
                groupTasks={this.state.groups[this.state.selectedGroup]}
                taskCompleted={this.taskMarkedAsComplete}
                taskIncompleted={this.taskMarkedAsIncomplete}
                backToOverview={this.backToOverview}
             />
    }
  }

  render() {
    return (
      <div className="Main_View">
        {this.renderOverviewOrDetailView()}
      </div>
    );
  }
}