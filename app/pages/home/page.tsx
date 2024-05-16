'use client';
import { Box, Grid, Stack } from '@mui/material';
import React from 'react';
import CheckboxFilter from '../../components/checkbox-filter';
import { useLazyQuery } from '@apollo/client';
import { IBrand } from '@/app/types/brand';
import { FIND_BRANDS } from '@/app/graphql/brand';
import { useState, useEffect, useCallback } from 'react';
import { ICategories } from '../../types/categories';
import { FIND_CATEGORIES } from '../../graphql/categories';
import ProductsPage from '../products/page';

const Home = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<{
    [key: string]: boolean;
  }>({});
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{
    [key: string]: boolean;
  }>({});

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

  const [findCategories, { loading: categoriesLoading }] = useLazyQuery(
    FIND_CATEGORIES,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        const { categories: categoriesData = [] } = data?.findCategories || {
          categories: [],
        };
        setCategories(categoriesData);
        setLoading(false);
      },
    }
  );

  const fetchFilters = useCallback(() => {
    setLoading(true);
    findBrands();
    findCategories();
  }, [findBrands, findCategories]);

  const handleBrandFilter = (value: boolean, name: string) => {
    setSelectedBrands((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCategoriesFilter = (value: boolean, name: string) => {
    setSelectedCategories((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  return (
    <Box
      component={'main'}
      sx={{
        bgcolor: '#eee',
      }}
    >
      <Grid container direction='row' p={2} spacing={2}>
        <Grid item xs={12} md={2}>
          <Stack spacing={2}>
            <CheckboxFilter
              filterName='Brands'
              items={brands.map((brand) => brand.name)}
              selectedItems={selectedBrands}
              handleFilter={handleBrandFilter}
            />
            <CheckboxFilter
              filterName='Categories'
              items={categories.map((category) => category.name)}
              selectedItems={selectedCategories}
              handleFilter={handleCategoriesFilter}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={10}>
          <ProductsPage
            brands={selectedBrands}
            categories={selectedCategories}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
