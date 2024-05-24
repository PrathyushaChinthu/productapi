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

type Props = {
  title: string;
  items: string[];
  checkedItems: string[];
  // handleCheckboxChange: (event: React.ChangeEvent) => void;
  handleCheckboxChange: (item: string, checked: boolean) => void;
};

const CheckboxFilter = (props: Props) => {
  const { title, items, checkedItems, handleCheckboxChange } = props;
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
                  checked={checkedItems.includes(item)}
                  size='medium'
                  // onChange={handleCheckboxChange}
                  onChange={(e) => handleCheckboxChange(item, e.target.checked)}
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
