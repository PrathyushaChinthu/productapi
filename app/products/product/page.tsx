'use client';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { IProduct } from '@/app/types/product';
import { FIND_PRODUCTS } from '@/app/graphql/product';
import ProductsCard from '@/app/components/ProductCard';
import { IBrand } from '@/app/types/brand';
import { ICategory } from '@/app/types/category';

type Props = {
  brands: IBrand[];
  categories: ICategory[];
  products: IProduct[];
};

export default function ProductsPage({ brands, categories, products }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchTimeoutRef = useRef<any>(null);

  // const [findProducts, { loading: queryLoading }] = useLazyQuery(
  //   FIND_PRODUCTS,
  //   {
  //     fetchPolicy: 'no-cache',
  //     onCompleted: (data) => {
  //       const { products: productsData = [] } = data?.findProducts || {
  //         products: [],
  //       };
  //       setProducts(productsData);
  //       setLoading(false);
  //     },
  //   }
  // );

  // const fetchProducts = useCallback(() => {
  //   setLoading(true);
  //   const searchFilter = searchTerm ? { title: searchTerm } : null;

  //   findProducts({ variables: { filter: { ...searchFilter } } });
  // }, [findProducts, searchTerm]);

  // useEffect(() => {
  //   if (fetchTimeoutRef.current) {
  //     clearTimeout(fetchTimeoutRef.current);
  //   }
  //   fetchTimeoutRef.current = setTimeout(() => {
  //     fetchProducts();
  //   }, 500);
  // }, [fetchProducts, searchTerm]);

  return (
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
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <ProductsCard products={products} />
        )}
      </Grid>
    </Grid>
  );
}
