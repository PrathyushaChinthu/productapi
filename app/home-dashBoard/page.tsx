'use client';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Card, Typography, Box, Stack } from '@mui/material';
import { IBrand } from '../types/brand';
import { useLazyQuery } from '@apollo/client';
import { FIND_BRANDS } from '@/app/graphql/brand';
import { ICategory } from '../types/categories';
import { FIND_CATEGORIES } from '../graphql/categories';

const HomeDashBoard = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const [findBrands, { loading: brandsLoading }] = useLazyQuery(FIND_BRANDS, {
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
    findBrands({ variables: { limit: 100 } });
    findCategories({ variables: { limit: 100 } });
  }, [findBrands, findCategories]);

  const handleBrandClick = (brandName: string) => {
    router.push(`/brands/${brandName}`);
  };

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/categories/${categoryName}`);
  };
  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const pageLoading = brandsLoading || categoriesLoading || loading;

  if (pageLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Stack spacing={2} height={'96vh'} alignItems={'center'}>
      <Stack height={'50%'} width={'90%'} spacing={1}>
        <Typography variant='h5'>Brands</Typography>
        <Grid container spacing={2} rowGap={2} overflow={'auto'}>
          {brands.length > 0 ? (
            brands.map((brand) => (
              <Grid item key={brand.id} xs={12} md={3}>
                <Card
                  key={brand.id}
                  sx={{
                    p: 1,
                    height: '100%',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleBrandClick(brand.name)}
                >
                  <Typography>{brand.name}</Typography>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No data found</Typography>
          )}
        </Grid>
      </Stack>
      <Stack height={'50%'} width={'90%'} spacing={2}>
        <Typography variant='h5'>Categories</Typography>
        <Grid container spacing={2} rowGap={2} overflow={'auto'}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Grid
                item
                key={category.id}
                xs={12}
                md={3}
                sx={{
                  marginBottom: 1,
                  marginTop: 1,
                }}
              >
                <Card
                  key={category.id}
                  sx={{
                    padding: 1,
                    height: '100%',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <Typography>{category.name}</Typography>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No data found</Typography>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default HomeDashBoard;
