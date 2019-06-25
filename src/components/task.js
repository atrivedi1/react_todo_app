import React from 'react'
import Completed from '../assets/completed.svg'
import Incomplete from '../assets/incomplete.svg'
import Locked from '../assets/locked.svg'

function determineImage(props) {
  if(props.isLocked) {
    return Locked
  } else if(props.isComplete) {
    return Completed
  } else {
    return Incomplete
  }
}

function determineTaskType(props) {
  if (props.isLocked) {
    return "Locked_Task"
  } else if (props.isComplete) {
    return "Completed_Task"
  } else {
    return "Incomplete_Task"
  }
}

function handleClick(props) {
  let taskId = props.taskInfo.id;

  if (!props.isLocked && !props.isComplete) {
    if (!props.dependenciesCompleted) {
      return console.log("dependent tasks not completed")
    } else {
      console.log(`task ${taskId} completed`)
      let timeCompleted = Date.now();
      return props.markComplete(taskId, timeCompleted)
    }
  }

  else if (!props.isLocked && props.isComplete) {
    console.log(`marking task ${taskId} as incomplete`);
    return props.markIncomplete(taskId)
  }

  else if (props.isLocked === true) {
    console.log("must complete dependencies to unlock")
  }
}

function Task(props) {
  let { taskInfo } = props;

  return ( 
      <div className="Section">
        <img className="Task_Image" alt="" src={determineImage(props)} onClick={() => {handleClick(props)}}/>
        <h3 className={determineTaskType(props)}>{taskInfo.task}</h3>
      </div>
  )
}

export default Task