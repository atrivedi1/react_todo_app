import React from 'react'
import groupArrow from '../assets/group.svg'

function completedTasks(tasks) {
  return tasks.filter((task) => {
    return task.completedAt !== null;
  }).length;
}

function handleClick(props) {
  props.selectGroup(props.groupName)
}

function Group (props) {
  return (
    <div className="Section">
      <img className="Group_Image" alt="" src={groupArrow} onClick={() => {handleClick(props)}}/>
      <h3 className="Group_Title">{props.groupName}</h3>  
      <h4 className="Group_Status">{`${completedTasks(props.groupTasks)} OF ${Object.keys(props.groupTasks).length} TASKS COMPLETE`}</h4>
    </div>
  );
}

export default Group