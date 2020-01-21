import React from "react";

export default function GroupsContainer(highprops) {
  return (
    <div>
      <div
        data-id={highprops.glist.id}
        className="group-definition-container"
        onClick={() => {
          highprops.getGroups(highprops.glist.id);
        }}
      >
        {highprops.glist.group_name}
      </div>
    </div>
  );
}
