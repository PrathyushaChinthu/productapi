'use client';
import ProductsCard from '@/app/components/ProductCard';
import { FIND_PRODUCTS } from '@/app/graphql/product';
import { IProduct } from '@/app/types/product';
import { useLazyQuery } from '@apollo/client';
import { Stack, Typography, Button, Grid } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import CheckboxFilter from '@/app/components/checkbox-filter';
import { ICategory } from '@/app/types/category';
import { FIND_CATEGORIES } from '@/app/graphql/category';
import { FIND_STORES } from '@/app/graphql/store';
import { IStore } from '@/app/types/store';
import queryString from 'query-string';

const BrandProductsPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [stores, setStores] = useState<IStore[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [selectedStores, setSelectedStores] = useState<string[]>([]);

  const [findProducts, { loading: productsLoading }] = useLazyQuery(
    FIND_PRODUCTS,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        const { products: productData = [] } = data?.findProducts || {
          products: [],
        };
        setProductsData(productData);
        setProducts(productData);
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

  const brand = decodeURI(params.category as string);

  const fetchProducts = useCallback(() => {
    findCategories({ variables: { limit: 100 } });
    findStores({ variables: { limit: 100 } });
    findProducts({ variables: { filter: { brand }, limit: 100 } });
  }, [findCategories, findStores, findProducts, brand]);

  const handleFilterChange = (
    type: 'category' | 'store',
    item: string,
    checked: boolean
  ) => {
    let updatedFilters: string[];

    if (type === 'category') {
      updatedFilters = checked
        ? [...selectedCategories, item]
        : selectedCategories.filter((category) => category !== item);

      setSelectedCategories(updatedFilters);
    } else {
      updatedFilters = checked
        ? [...selectedStores, item]
        : selectedStores.filter((store) => store !== item);

      setSelectedStores(updatedFilters);
    }

    const filters = {
      categories: type === 'category' ? updatedFilters : selectedCategories,
      stores: type === 'store' ? updatedFilters : selectedStores,
    };

    const queryStringified = queryString.stringify(filters, {
      skipNull: true,
    });

    router.push(`?${queryStringified}`);
    // router.push(`/brand/${params.brand}/?${queryStringified}`);
  };
  useEffect(() => {
    const categories = searchParams.getAll('categories');
    const stores = searchParams.get('stores');

    if (categories.length > 0) {
      setProducts(
        productsData.filter((product) =>
          categories.every((category) => category === product.category)
        )
      );
    } else if (stores) {
      setProducts(productsData.filter((product) => product.store === stores));
    } else if (categories.length > 0 && stores) {
      setProducts(
        productsData.filter(
          (product) =>
            categories.every((category) => category === product.category) &&
            product.store === stores
        )
      );
    } else {
      setProducts(productsData);
    }
  }, [searchParams, productsData]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const loadingAll =
    loading || productsLoading || categoriesLoading || storesLoading;

  if (loadingAll) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2}>
        <Button
          variant='contained'
          sx={{ marginBottom: '30px' }}
          onClick={() => router.push('/')}
        >
          Back
        </Button>
        <Stack spacing={2} sx={{ mx: 1 }}>
          <CheckboxFilter
            title='Categories'
            items={categories.map((category) => category.name)}
            checkedItems={selectedCategories}
            handleCheckboxChange={(item, checked) =>
              handleFilterChange('category', item, checked)
            }
          />
          <CheckboxFilter
            title='Store'
            items={stores.map((store) => store.name)}
            checkedItems={selectedStores}
            handleCheckboxChange={(item, checked) =>
              handleFilterChange('store', item, checked)
            }
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
