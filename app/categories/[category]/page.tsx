'use client';
import ProductsCard from '@/app/components/ProductCard';
import { FIND_CATEGORIES } from '@/app/graphql/categories';
import { FIND_PRODUCTS } from '@/app/graphql/product';
import { ICategory } from '@/app/types/categories';
import { IProduct } from '@/app/types/product';
import { useLazyQuery } from '@apollo/client';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

const CategoryProductsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

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

  const [findCategories, { loading: categoriesLoading }] = useLazyQuery(
    FIND_CATEGORIES,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        const { categories: categoriesData = [] } = data?.findCategories || {
          categories: [],
        };
        setCategories(categoriesData);
      },
    }
  );

  const categoryId = categories.find((cat) => cat.name === params.category)?.id;

  const fetchProducts = useCallback(() => {
    findCategories();

    findProducts({ variables: { filter: { categoryId } } });
  }, [findProducts, findCategories, categoryId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const loadingAll = productsLoading || categoriesLoading;

  if (loadingAll) {
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

export default CategoryProductsPage;
