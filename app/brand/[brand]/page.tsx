'use client';
import ProductsCard from '@/app/components/ProductCard';
import { FIND_BRANDS } from '@/app/graphql/brand';
import { FIND_PRODUCTS } from '@/app/graphql/product';
import { IBrand } from '@/app/types/brand';
import { IProduct } from '@/app/types/product';
import { useLazyQuery } from '@apollo/client';
import { Box, Stack, Typography, Button, Grid } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import CheckboxFilter from '@/app/components/checkbox-filter';
import { ICategory } from '@/app/types/category';
import { FIND_CATEGORIES } from '@/app/graphql/category';
import { FIND_STORES } from '@/app/graphql/store';
import { IStore } from '@/app/types/store';

const BrandProductsPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState(false);

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
  const [findStores, { loading: storesLoading }] = useLazyQuery(FIND_STORES, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      const { stores: storesData = [] } = data?.findStores || {
        stores: [],
      };
      setStores(storesData);
      setLoading(false);
    },
  });

  const brandId = brands.find((b) => b.name === params.brand)?.id;

  const fetchProducts = useCallback(() => {
    findBrands({ variables: { limit: 100 } });
    findCategories({ variables: { limit: 100 } });
    findStores({ variables: { limit: 100 } });
    findProducts({ variables: { filter: { brandId } } });
  }, [findBrands, findCategories, findStores, findProducts, brandId]);

  const handleFilter = async (item: any) => {
    const categoryId = categories.find((c) => c.name === item)?.id;
    const storeId = stores.find((s) => s.name === item)?.id;

    if (categoryId || storeId) {
      try {
        const { data } = await findProducts({
          variables: {
            filter: {
              categoryId,
              storeId,
            },
          },
        });
        setProducts(data?.findProducts?.products || []);
      } catch (error) {
        console.log(error);
      }
    } else {
      findProducts();
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
        <Stack spacing={2}>
          <CheckboxFilter
            title='Categories'
            items={categories.map((category) => category.name)}
            checked={isChecked}
            handleCheckboxChange={handleFilter}
          />
          <CheckboxFilter
            title='Store'
            items={stores.map((store) => store.name)}
            checked={isChecked}
            handleCheckboxChange={handleFilter}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <ProductsCard products={products} />
      </Grid>
    </Grid>
  );
};

export default BrandProductsPage;
