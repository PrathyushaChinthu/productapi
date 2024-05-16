import { gql } from '@apollo/client';

export const FIND_BRANDS = gql`
  query FindBrands($filter: BrandFilter, $skip: Int, $limit: Int) {
    findBrands(filter: $filter, skip: $skip, limit: $limit) {
      brands {
        id
        name
        active
      }
      count
    }
  }
`;

export const FIND_BRAND = gql`
  query FindBrandById($id: String!) {
    findBrandById(id: $id) {
      id
      name
      active
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation CreateBrand($input: CreateBrandDto!) {
    createBrand(input: $input) {
      id
      name
      active
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation UpdateBrand($id: String!, $input: UpdateBrandDto!) {
    updateBrand(id: $id, input: $input) {
      id
      name
      active
    }
  }
`;
