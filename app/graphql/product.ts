import { gql } from '@apollo/client';

export const FIND_PRODUCTS = gql`
  query FindProducts($filter: ProductFilter, $skip: Int, $limit: Int) {
    findProducts(filter: $filter, skip: $skip, limit: $limit) {
      products {
        active
        brand
        brandId
        category
        categoryId
        code
        createdAt
        dealPrice
        description
        expired
        id
        imageUrl
        mrp
        regularPrice
        store
        storeId
        title
        updatedAt
      }
      count
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductDto!) {
    createUser(input: $input) {
      brandId
      categoryId
      code
      dealPrice
      description
      imageUrl
      mrp
      regularPrice
      storeId
      title
    }
  }
`;

export const FIND_PRODUCT_BY_ID = gql`
  query FindProductById($id: String!) {
    findProductById(id: $id) {
      active
      brand
      brandId
      category
      categoryId
      code
      createdAt
      dealPrice
      description
      expired
      id
      imageUrl
      mrp
      regularPrice
      store
      storeId
      title
      updatedAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: String!, $input: UpdateProductDto!) {
    updateProduct(id: $id, input: $input) {
      active
      brandId
      categoryId
      code
      dealPrice
      description
      expired
      id
      imageUrl
      mrp
      regularPrice
      storeId
      title
      updatedAt
    }
  }
`;
