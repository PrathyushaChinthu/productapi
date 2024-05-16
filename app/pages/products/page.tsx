'use client';
import { Box, Grid, TextField, Typography } from '@mui/material';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { IProduct } from '@/app/types/product';
import { FIND_PRODUCTS } from '@/app/graphql/product';
import ProductsCard from '@/app/components/ProductCard';
import Drawer from '@/app/components/drawer';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchTimeoutRef = useRef<any>(null);

  const [findProducts, { loading: queryLoading }] = useLazyQuery(
    FIND_PRODUCTS,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        const { products: productsData = [] } = data?.findProducts || {
          products: [],
        };
        setProducts(productsData);
        setLoading(false);
      },
    }
  );

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const filter = searchTerm ? { title: searchTerm } : {};
    findProducts({ variables: { filter } });
  }, [findProducts, searchTerm]);

  useEffect(() => {
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }
    fetchTimeoutRef.current = setTimeout(() => {
      fetchProducts();
    }, 500);
  }, [fetchProducts, searchTerm]);

  return (
    <Box
      component={'main'}
      sx={{
        bgcolor: '#eee',
      }}
    >
      <Grid container direction='row' p={2}>
        <Grid item xs={12} md={2}>
          <Drawer />
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={12}>
              <Typography variant='h5'>Products</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder='Search...'
                size='small'
                variant='outlined'
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {loading || queryLoading ? (
                <Typography>Loading...</Typography>
              ) : (
                <ProductsCard products={products} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
