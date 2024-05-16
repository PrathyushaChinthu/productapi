import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';

type Props = {
  filterName: string;
  items: string[];
  selectedItems: { [key: string]: boolean };
  handleFilter: (value: boolean, name: string) => void;
};

const CheckboxFilter = (props: Props) => {
  const { filterName, items, selectedItems, handleFilter } = props;
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
        {filterName}
      </Typography>
      <Box sx={{ height: '200px', overflow: 'auto', p: 2 }}>
        <FormGroup>
          {items?.map((brand: string) => {
            let checked = selectedItems[brand] ?? false;
            return (
              <FormControlLabel
                key={brand}
                control={<Checkbox checked={checked} />}
                label={brand}
                onChange={(e: any) => handleFilter(e.target.checked, brand)}
              />
            );
          })}
        </FormGroup>
      </Box>
    </Card>
  );
};

export default CheckboxFilter;
