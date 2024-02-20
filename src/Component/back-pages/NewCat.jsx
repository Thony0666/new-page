import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function NameSelector() {
  const [selectedName, setSelectedName] = useState(""); 
  const [modifiedName, setModifiedName] = useState(""); 
  const [isEditing, setIsEditing] = useState(false); 

  const handleModify = () => {
    setIsEditing(true);
    setModifiedName(selectedName); 
  };

  const handleSave = () => {
    setIsEditing(false); 
    setSelectedName(modifiedName);
  };

  return (
    <div>
      <Select
        value={selectedName}
        onChange={(e) => setSelectedName(e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Sélectionnez un nom
        </MenuItem>
        <MenuItem value="name1">Nom 1</MenuItem>
        <MenuItem value="name2">Nom 2</MenuItem>
        <MenuItem value="name3">Nom 3</MenuItem>
      </Select>
      {!isEditing ? (
        <Button variant="contained" onClick={handleModify}>Modifier</Button>
      ) : (
        <div>
          <TextField
            label="Nom modifié"
            value={modifiedName}
            onChange={(e) => setModifiedName(e.target.value)}
          />
          <Button variant="contained" onClick={handleSave}>Enregistrer</Button>
        </div>
      )}
    </div>
  );
}

export default NameSelector;
