'use client';
import ProductsCard from '@/app/components/ProductCard';
import { FIND_CATEGORIES } from '@/app/graphql/categories';
import { FIND_PRODUCTS } from '@/app/graphql/product';
import { ICategory } from '@/app/types/categories';
import { IProduct } from '@/app/types/product';
import { useLazyQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const CategoryProductsPage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  //   console.log(params.get('category'));
  //   console.log(router.);

  const [findProducts, { loading: queryLoading }] = useLazyQuery(
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

  const fetchProducts = useCallback(() => {
    findCategories();
    const category = params.get('category');
    const categoryId = categories.find((cat) => cat.name === category)?.id;
    findProducts({ variables: { filter: { categoryId } } });
  }, [findProducts, findCategories, categories, params]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  //   console.log(products);

  return (
    <Box>
      <ProductsCard products={products} />
    </Box>
  );
};

export default CategoryProductsPage;
