import React, { useEffect } from 'react'

export default function GroupsContainer(highprops) {
    return (
        <div>
             <div className="group-definition-container">{highprops.glist}</div>
        </div>
    )
}
