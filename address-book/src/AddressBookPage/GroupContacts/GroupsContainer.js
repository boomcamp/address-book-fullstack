import React, { useEffect } from "react";

export default function GroupsContainer(highprops) {
  return (
    <div>
      <div
        data-id={highprops.glist.id}
        className="group-definition-container"
        style={style.groupDefinitionContainer}
        onClick={() => {
          highprops.getGroups(highprops.glist.id);
        }}
      >
        {highprops.glist.group_name}
      </div>
    </div>
  );
}

const style = {
  groupDefinitionContainer: {
    cursor: "pointer"
  }
};
