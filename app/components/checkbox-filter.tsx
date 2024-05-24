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
  handleCheckboxChange: (
    item: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const CheckboxFilter: React.FC<CheckboxMenuProps> = ({
  title,
  items,
  checked,
  handleCheckboxChange,
}) => {
  return (
    <Box width='100%'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>
          <Stack sx={{ height: '200px', overflow: 'auto' }}>
            {items.map((item, index) => (
              <Stack key={index} direction='row' alignItems='center'>
                <Checkbox
                  checked={checked}
                  size='medium'
                  // onChange={handleCheckboxChange}
                  onChange={(event) => handleCheckboxChange(item, event)}
                  color='primary'
                />
                <Typography variant='subtitle1'>{item}</Typography>
              </Stack>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CheckboxFilter;
