'use client';
import { Box, Grid, Stack } from '@mui/material';
import React from 'react';
import CheckboxFilter from '../../components/checkbox-filter';
import { useLazyQuery } from '@apollo/client';
import { IBrand } from '@/app/types/brand';
import { FIND_BRANDS } from '@/app/graphql/brand';
import { useState, useEffect, useCallback } from 'react';
import { ICategory } from '../../types/category';
import { FIND_CATEGORIES } from '../../graphql/category';
import ProductsPage from '../product/page';
import { FIND_SUB_CATEGORIES } from '@/app/graphql/subcategory';
import { ISubcategory } from '@/app/types/subcategory';
import { IProduct } from '@/app/types/product';
import { FIND_PRODUCTS } from '@/app/graphql/product';
import { FIND_STORES } from '@/app/graphql/store';
import { useSearchParams } from 'next/navigation';

const Drawer = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<any[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const searchParams = useSearchParams();

  const [findBrands, { loading: brandsLoading }] = useLazyQuery(FIND_BRANDS, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      const { brands: brandsData = [] } = data?.findBrands || {
        brands: [],
      };
      setBrands(brandsData);
      setLoading(false);
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

  const [findSubcategories, { loading: subcategoriesLoading }] = useLazyQuery(
    FIND_SUB_CATEGORIES,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        const { subcategories: subcategoriesData = [] } =
          data?.findSubcategories || {
            subcategories: [],
          };
        setSubcategories(subcategoriesData);
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

  const fetchFilters = useCallback(() => {
    setLoading(true);
    findBrands();
    findCategories();
    findSubcategories();
    findStores();
    findProducts();
  }, [findBrands, findCategories, findProducts, findSubcategories, findStores]);

  const [isChecked, setIsChecked] = useState(false);

  const handleFilter = async (item: any) => {
    const brandId = brands.find((brand) => brand.name === item)?.id;
    const categoryId = categories.find((cat) => cat.name === item)?.id;
    const subcategoryId = subcategories.find(
      (subcat) => subcat.name === item
    )?.id;
    const storeId = stores.find((store) => store.name === item)?.id;

    if (brandId || categoryId || subcategoryId || storeId) {
      try {
        const { data } = await findProducts({
          variables: {
            filter: {
              brandId,
              categoryId,
              subcategoryId,
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

  // const handleBrandFilter = async (item: any) => {
  //   const brandId = brands.find((brand) => brand.name === item)?.id;
  //   try {
  //     const { data } = await findProducts({
  //       variables: {
  //         filter: {
  //           brandId,
  //         },
  //       },
  //     });
  //     setProducts(data?.findProducts?.products || []);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleCategoriesFilter = async (item: any) => {
  //   const categoryId = categories.find((cat) => cat.name === item)?.id;
  //   try {
  //     const { data } = await findProducts({
  //       variables: {
  //         filter: {
  //           categoryId,
  //         },
  //       },
  //     });
  //     setProducts(data?.findProducts?.products || []);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setSelectedCategories((prev) => ({
  //     ...prev,
  //     item,
  //   }));
  // };

  // const handleSubcategoriesFilter = async (item: any) => {
  //   const subcategoryId = subcategories.find(
  //     (subcategory) => subcategory.name === item
  //   )?.id;
  //   try {
  //     const { data } = await findProducts({
  //       variables: {
  //         filter: {
  //           subcategoryId,
  //         },
  //       },
  //     });
  //     setProducts(data?.findProducts?.products || []);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleStoreFilter = async (item: any) => {
  //   const storeId = stores.find((store) => store.name === item)?.id;
  //   try {
  //     const { data } = await findProducts({
  //       variables: {
  //         filter: {
  //           storeId,
  //         },
  //       },
  //     });
  //     setProducts(data?.findProducts?.products || []);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  // console.log(searchParams);

  // console.log(selectedBrands, selectedCategories);

  return (
    <Box
      component={'main'}
      sx={{
        bgcolor: '#eee',
      }}
    >
      <Grid container direction='row' p={2} spacing={2}>
        <Grid item xs={12} md={2}>
          <Stack spacing={2}>
            <CheckboxFilter
              title='Brands'
              items={brands.map((brand) => brand.name)}
              checked={isChecked}
              handleCheckboxChange={handleFilter}
            />
            <CheckboxFilter
              title='Categories'
              items={categories.map((category) => category.name)}
              checked={isChecked}
              handleCheckboxChange={handleFilter}
            />
            <CheckboxFilter
              title='Subcategories'
              items={subcategories.map((subcategory) => subcategory.name)}
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
        <Grid item xs={12} md={10}>
          <ProductsPage
            products={products}
            brands={selectedBrands}
            categories={selectedCategories}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Drawer;
