'use client';
import CheckboxFilter from '@/app/components/checkbox-filter';
import ProductsCard from '@/app/components/ProductCard';
import { FIND_BRANDS } from '@/app/graphql/brand';
import { FIND_PRODUCTS } from '@/app/graphql/product';
import { FIND_STORES } from '@/app/graphql/store';
import { IBrand } from '@/app/types/brand';
import { IProduct } from '@/app/types/product';
import { IStore } from '@/app/types/store';
import { useLazyQuery } from '@apollo/client';
import { Typography, Button, Grid, Stack } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';

const CategoryProductsPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [stores, setStores] = useState<IStore[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

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

  const category = decodeURI(params.category as string);

  const fetchProducts = useCallback(() => {
    findBrands({ variables: { limit: 100 } });
    findStores({ variables: { limit: 100 } });
    findProducts({ variables: { filter: { category }, limit: 100 } });
  }, [findProducts, category, findBrands, findStores]);

  const handleFilterChange = (
    type: 'brand' | 'store',
    item: string,
    checked: boolean
  ) => {
    let updatedFilters: string[];

    if (type === 'brand') {
      updatedFilters = checked
        ? [...selectedBrands, item]
        : selectedBrands.filter((brand) => brand !== item);

      setSelectedBrands(updatedFilters);
    } else {
      updatedFilters = checked
        ? [...selectedStores, item]
        : selectedStores.filter((store) => store !== item);

      setSelectedStores(updatedFilters);
    }

    const filters = {
      brands: type === 'brand' ? updatedFilters : selectedBrands,
      stores: type === 'store' ? updatedFilters : selectedStores,
    };

    const queryStringified = queryString.stringify(filters, {
      skipNull: true,
    });

    router.push(`?${queryStringified}`);
  };

  useEffect(() => {
    const brands = searchParams.getAll('brands');
    const stores = searchParams.get('stores');
    // const stores = searchParams.getAll('stores');

    // if (brands.length > 0) {
    //   findProducts({
    //     variables: { filter: { brand: brands, category: category } },
    //   });
    // } else if (stores.length > 0) {
    //   findProducts({
    //     variables: { filter: { store: stores, category: category } },
    //   });
    // } else if (brands.length > 0 && stores.length > 0) {
    //   findProducts({
    //     variables: {
    //       filter: { brand: brands, store: stores, category: category },
    //     },
    //   });
    // } else {
    //   findProducts({ variables: { filter: { category: category } } });
    // }

    if (brands.length > 0) {
      setProducts(
        productsData.filter((product) =>
          brands.every((brand) => brand === product.brand)
        )
      );
    } else if (stores) {
      setProducts(productsData.filter((product) => product.store === stores));
    } else if (brands.length > 0 && stores) {
      setProducts(
        productsData.filter(
          (product) =>
            brands.every((brand) => brand === product.brand) &&
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

  const loadingAll = loading || brandsLoading || storesLoading;

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
            checkedItems={selectedBrands}
            handleCheckboxChange={(item, checked) =>
              handleFilterChange('brand', item, checked)
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
        {productsLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <ProductsCard products={products} />
        )}
      </Grid>
    </Grid>
  );
};

export default CategoryProductsPage;
