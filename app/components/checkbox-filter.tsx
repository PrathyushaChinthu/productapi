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

interface CheckboxMenuProps {
  title: string;
  items: string[];
  checked: boolean;
  // handleCheckboxChange: (event: React.ChangeEvent) => void;
  handleCheckboxChange: (item: string) => void;
}

const CheckboxFilter: React.FC<CheckboxMenuProps> = ({
  title,
  items,
  checked,
  handleCheckboxChange,
}) => {
  return (
    <Box width='100%' px={2}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>
          <Stack sx={{ height: '200px', overflow: 'auto', p: 2 }}>
            {items.map((item, index) => (
              <Stack key={index} direction='row' alignItems='center'>
                <Checkbox
                  checked={checked}
                  size='medium'
                  // onChange={handleCheckboxChange}
                  onChange={() => handleCheckboxChange(item)}
                  color='primary'
                />
                <Typography variant='subtitle1' fontSize='0.9rem'>
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CheckboxFilter;
