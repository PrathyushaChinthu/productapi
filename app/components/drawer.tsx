import { Box, List, ListItem, ListItemButton, Typography } from '@mui/material';
import React from 'react';

const AppDrawer = () => {
  const filters = ['Brands', 'Categories'];

  return (
    <Box>
      <List>
        {filters.map((filter) => (
          <ListItem key={filter} disablePadding>
            <ListItemButton onClick={() => {}}>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {filter}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AppDrawer;
