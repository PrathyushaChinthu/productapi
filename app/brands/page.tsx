'use client';
import ProductsCard from '@/app/components/ProductCard';
import { FIND_BRANDS } from '@/app/graphql/brand';
import { FIND_PRODUCTS } from '@/app/graphql/product';
import { IBrand } from '@/app/types/brand';
import { IProduct } from '@/app/types/product';
import { useLazyQuery } from '@apollo/client';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

const BrandProductsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);

  const [findProducts, { loading: productsLoading }] = useLazyQuery(
    FIND_PRODUCTS,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        const { products: productsData = [] } = data?.findProducts || {
          products: [],
        };
        setProducts(productsData);
      },
    }
  );

  const [findBrands, { loading: brandsLoading }] = useLazyQuery(FIND_BRANDS, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      const { brands: brandsData = [] } = data?.findBrands || {
        brands: [],
      };
      setBrands(brandsData);
    },
  });

  const brand = searchParams.get('brand');
  const brandId = brands.find((b) => b.name === brand)?.id;

  const fetchProducts = useCallback(() => {
    findBrands();
    findProducts({ variables: { filter: { brandId } } });
  }, [findBrands, findProducts, brandId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const loading = productsLoading || brandsLoading;

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container m={3}>
      <Grid item xs={12} md={2}>
        <Button
          variant='contained'
          sx={{ marginBottom: '30px' }}
          onClick={() => router.push('/')}
        >
          Back
        </Button>
      </Grid>
      <Grid item xs={12} md={8}>
        <ProductsCard products={products} />
      </Grid>
    </Grid>
  );
};

export default BrandProductsPage;
