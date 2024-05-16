import { Box, List, ListItem, ListItemButton, Typography } from '@mui/material';
import React from 'react';
import CheckboxFilter from './checkbox-filter';

const AppDrawer = () => {
  return (
    <Box>
      <List>
        <ListItem disablePadding>
          <CheckboxFilter
            filterName='Brands'
            items={brands}
            selectedItems={selectedFilters.brands}
            handleFilter={handleCheckboxFilter}
          />
        </ListItem>
        <ListItem disablePadding>
          <CheckboxFilter
            filterName='Brands'
            items={categories}
            selectedItems={selectedFilters.categories}
            handleFilter={handleCheckboxFilter}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default AppDrawer;
