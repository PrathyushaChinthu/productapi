'use client';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Card, Typography } from '@mui/material';
import { IBrand } from '../types/brand';
import { useLazyQuery } from '@apollo/client';
import { FIND_BRANDS } from '@/app/graphql/brand';

type Props = {};

const HomeDashBoard = (props: Props) => {
  const [brands, setBrands] = useState<IBrand[]>([]);
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

  const fetchFilters = useCallback(() => {
    setLoading(true);
    findBrands({ variables: { limit: 100 } });
  }, [findBrands]);

  const handleBrandClick = (brandName: string) => {
    router.push(`/brand?name=${brandName}`);
  };

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  return (
    <Grid container spacing={2}>
      {brands.length > 0 ? (
        brands.map((brand) => (
          <Grid
            item
            key={brand.id}
            xs={12}
            md={3}
            sx={{
              marginBottom: 1,
              marginTop: 1,
            }}
          >
            <Card
              key={brand.id}
              sx={{
                padding: 1,
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
  );
};

export default HomeDashBoard;
