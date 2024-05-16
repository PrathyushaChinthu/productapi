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
  items: any;
  selectedItems: any;
  handleFilter: (value: string, name: string, filterName: string) => void;
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
          {items?.map((brand: any) => {
            let checked = selectedItems[brand] ?? false;
            return (
              <FormControlLabel
                key={brand}
                control={<Checkbox />}
                label={brand}
                checked={checked}
                onChange={(e: any) =>
                  handleFilter(e.target.checked, brand, filterName)
                }
              />
            );
          })}
        </FormGroup>
      </Box>
    </Card>
  );
};

export default CheckboxFilter;
