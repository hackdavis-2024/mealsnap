import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TableChartIcon from '@mui/icons-material/TableChart';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useNavigate } from 'react-router-dom';


export default function AppBottomNavigation() {
  const [value, setValue] = React.useState('recents');
  const navigate = useNavigate(); // Create a navigate function

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue); // Navigate to the new value, which are route paths
  };

  return (
    <BottomNavigation sx={{ 
      width: 500,
      bottom: 0,
      position: 'fixed',
      left: '50%',
      transform: 'translateX(-50%)',
    }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Recents"
        value="/"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="/table"
        icon={<TableChartIcon/>}
      />
      <BottomNavigationAction
        label="Nearby"
        value="/profile"
        icon={<CalendarMonthIcon/>}
      />
      <BottomNavigationAction
        label="Nearby"
        value="/camera"
        icon={<CameraAltIcon/>}
      />
      <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
  );
}
