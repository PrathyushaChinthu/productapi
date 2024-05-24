'use client';
import CheckboxFilter from '@/app/components/checkbox-filter';
import ProductsCard from '@/app/components/ProductCard';
import { FIND_BRANDS } from '@/app/graphql/brand';
import { FIND_CATEGORIES } from '@/app/graphql/category';
import { FIND_PRODUCTS } from '@/app/graphql/product';
import { FIND_STORES } from '@/app/graphql/store';
import { IBrand } from '@/app/types/brand';
import { ICategory } from '@/app/types/category';
import { IProduct } from '@/app/types/product';
import { IStore } from '@/app/types/store';
import { useLazyQuery } from '@apollo/client';
import { Box, Typography, Button, Grid, Stack } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

const CategoryProductsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [stores, setStores] = useState<IStore[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);

  const [findProducts, { loading: productsLoading }] = useLazyQuery(
    FIND_PRODUCTS,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        const { products: productsData = [] } = data?.findProducts || {
          products: [],
        };
        setProductsData(productsData);
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

  const [findBrands, { loading: brandsLoading }] = useLazyQuery(FIND_BRANDS, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      const { brands: brandsData = [] } = data?.findBrands || {
        brands: [],
      };
      setBrands(brandsData);
    },
  });

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

  const categoryId = categories.find((cat) => cat.name === params.category)?.id;

  const fetchProducts = useCallback(() => {
    findCategories({ variables: { limit: 100 } });
    findBrands({ variables: { limit: 100 } });
    findStores({ variables: { limit: 100 } });
    findProducts({ variables: { filter: { categoryId } } });
  }, [findProducts, findCategories, categoryId, findBrands, findStores]);

  const handleBrandFilter = async (
    item: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsChecked(event.target.checked);

    if (item) {
      setProducts(productsData.filter((product) => product.brand === item));
    } else {
      setProducts([]);
    }
  };
  const handleStoreFilter = async (
    item: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsChecked(event.target.checked);
    const selectedStores: IProduct[] = productsData.filter(
      (product) => product.store === item
    );
    if (selectedStores.length > 0) {
      setProducts(productsData.filter((product) => product.store === item));
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const loadingAll = productsLoading || categoriesLoading;

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
            title='Brands'
            items={brands.map((brand) => brand.name)}
            checked={isChecked}
            handleCheckboxChange={handleBrandFilter}
          />
          <CheckboxFilter
            title='Store'
            items={stores.map((store) => store.name)}
            checked={isChecked}
            handleCheckboxChange={handleStoreFilter}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <ProductsCard products={products} />
      </Grid>
    </Grid>
  );
};

export default CategoryProductsPage;
