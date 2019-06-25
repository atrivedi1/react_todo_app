import React from 'react'
import Task from './Task.js'

function renderTasks(props) {
  return props.groupTasks.map((task, index) => {
    let taskId = task["id"];
    let taskInfo = props.groupTasks[index];
    let isComplete = taskInfo.completedAt === null ? false : true;
    let dependenciesCompleted = areDepsComplete(props, taskId);

    return <Task
      taskInfo={taskInfo}
      isComplete={isComplete}
      isLocked={!dependenciesCompleted}
      dependenciesCompleted={dependenciesCompleted}
      markComplete={props.taskCompleted}
      markIncomplete={props.taskIncompleted}
      key={taskId}
    />
  })
}

function groupDependencies(tasks) {
  let dependencies = {}

  for (let task in tasks) {
    let currTaskObj = tasks[task];
    let currTaskId = currTaskObj.id;
    let currTaskDependencies = currTaskObj.dependencyIds;
    dependencies[currTaskId] = currTaskDependencies;
  }
  return dependencies;
}

function areDepsComplete(props, id) {
  let taskDependencies = groupDependencies(props.allTasks)[id];

  if (taskDependencies.length === 0) {
    return true;
  }

  else {
    for (let i = 0; i < taskDependencies.length; i++) {
      let currDependency = taskDependencies[i];

      if (props.allTasks[currDependency].completedAt === null) {
        return false;
      }
    }
    return true;
  }
}

function handleClick(e, props) {
  e.preventDefault();
  props.backToOverview();
}

function Details (props) {
  return (
    <div>
      <a className="Overview_Link" href="/" onClick={(e) => { handleClick(e, props) }}>ALL GROUPS</a>
      <h2 className="Section">{props.groupName}</h2>
      {renderTasks(props)}
    </div>
  );

}

export default Details