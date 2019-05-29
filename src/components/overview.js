import React from 'react'

import Group from './group.js'

function renderGroups(props, groups) {
  return Object.keys(groups).map((groupName, i) => {

    return <Group
      groupTasks={props.groups[groupName]}
      groupName={groupName}
      selectGroup={props.selectedGroup}
      key={i}
    />
  })
}

function Overview (props){
  let { groups } = props;

  return (
    <div>
      <h2 className="Section">Things To Do</h2>
      {renderGroups(props, groups)}
    </div>
  );
}

export default Overview