import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ISubcategory } from '../types/subcategory';

interface CheckboxMenuProps {
  title: string;
  items: ISubcategory[];
  checked: boolean;
  // handleCheckboxChange: (event: React.ChangeEvent) => void;
  handleCheckboxChange: (item: ISubcategory) => void;
}

const CheckboxMenu: React.FC<CheckboxMenuProps> = ({
  title,
  items,
  checked,
  handleCheckboxChange,
}) => {
  return (
    <Box width='100%' px={2}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {title}
        </AccordionSummary>
        <AccordionDetails>
          <Stack sx={{ height: '200px', overflow: 'auto', p: 2 }}>
            {items
              .filter((item) => item.category === title)
              .map((item) => (
                <Stack key={item.id} direction='row' alignItems='center'>
                  <Checkbox
                    checked={checked}
                    size='medium'
                    // onChange={handleCheckboxChange}
                    onChange={() => handleCheckboxChange(item)}
                    color='primary'
                  />
                  <Typography variant='subtitle1' fontSize='0.9rem'>
                    {item.name}
                  </Typography>
                </Stack>
              ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CheckboxMenu;
