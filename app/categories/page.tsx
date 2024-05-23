'use client';
import ProductsCard from '@/app/components/ProductCard';
import { FIND_CATEGORIES } from '@/app/graphql/categories';
import { FIND_PRODUCTS } from '@/app/graphql/product';
import { ICategory } from '@/app/types/categories';
import { IProduct } from '@/app/types/product';
import { useLazyQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

const CategoryProductsPage = () => {
  const params = useSearchParams();
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

  const category = params.get('category');
  const categoryId = categories.find((cat) => cat.name === category)?.id;

  const fetchProducts = useCallback(() => {
    findCategories();
    findProducts({ variables: { filter: { categoryId } } });
  }, [findCategories, findProducts, categoryId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const loadingAll = productsLoading || categoriesLoading;

  if (loadingAll) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <ProductsCard products={products} />
    </Box>
  );
};

export default CategoryProductsPage;
