'use client';
import { Box, List, ListItem, ListItemButton, Typography } from '@mui/material';
import React from 'react';
import CheckboxFilter from './checkbox-filter';
import { useLazyQuery } from '@apollo/client';
import { IBrand } from '@/app/types/brand';
import { FIND_BRANDS } from '@/app/graphql/brand';
import { useState, useEffect, useCallback, useRef } from 'react';

const AppDrawer = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<{
    [key: string]: boolean;
  }>({});
  const fetchTimeoutRef = useRef<any>(null);

  const [findBrands, { loading: queryLoading }] = useLazyQuery(FIND_BRANDS, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      const { brands: brandsData = [] } = data?.findBrands || {
        brands: [],
      };
      setBrands(brandsData);
      setLoading(false);
    },
  });

  const fetchBrands = useCallback(() => {
    setLoading(true);
    findBrands();
  }, [findBrands]);

  const handleFilter = (value: boolean, name: string) => {
    setSelectedBrands((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <Box>
      <List>
        <ListItem disablePadding>
          <CheckboxFilter
            filterName='Brands'
            items={brands.map((brand) => brand.name)}
            selectedItems={selectedBrands}
            handleFilter={handleFilter}
          />
        </ListItem>
        {/* <ListItem disablePadding>
          <CheckboxFilter
            filterName='Categories'
            items={categories}
            selectedItems={selectedFilters.categories}
            handleFilter={handleCheckboxFilter}
          />
        </ListItem> */}
      </List>
    </Box>
  );
};

export default AppDrawer;
