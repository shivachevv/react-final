import React, { useState } from 'react';

function TeamDetails(props) {
    const [teamId, setTeamId] = useState(props.match.params.id)


    return (
        <div>
            TeamDetails {teamId}
        </div>
    );
}

export default TeamDetails;