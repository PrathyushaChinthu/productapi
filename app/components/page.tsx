'use client';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { FIND_PRODUCTS } from '../graphql/product';
import ProductsCard from './ProductCard';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import type { IProduct } from '../types/product';

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
      sx={{ p: 2, bgcolor: '#eee', display: 'flex', justifyContent: 'center' }}
    >
      <Grid container spacing={2} alignItems={'center'} sx={{ width: '70%' }}>
        <Grid item xs={12} md={12}>
          <Typography>Products</Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            placeholder='Search...'
            size='small'
            variant='outlined'
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          {loading || queryLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <ProductsCard products={products} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
