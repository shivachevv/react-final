import React from 'react';
import { Link } from 'react-router-dom';

function EditTeamBtn({id}) {
    return (
        <Link to={`edit-team/${id}`}>Edit Your Team!</Link>
    );
}

export default EditTeamBtn;