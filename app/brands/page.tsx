'use client';
import ProductsCard from '@/app/components/ProductCard';
import { FIND_BRANDS } from '@/app/graphql/brand';
import { FIND_PRODUCTS } from '@/app/graphql/product';
import { IBrand } from '@/app/types/brand';
import { IProduct } from '@/app/types/product';
import { useLazyQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

const BrandProductsPage = () => {
  const searchParams = useSearchParams();
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
    <Box>
      <ProductsCard products={products} />
    </Box>
  );
};

export default BrandProductsPage;
