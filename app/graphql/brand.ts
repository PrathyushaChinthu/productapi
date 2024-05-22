import { gql } from '@apollo/client';

export const FIND_BRANDS = gql`
  query FindBrands(
    $filter: BrandFilter
    $skip: Int
    $limit: Int
    $search: BrandSearch
  ) {
    findBrands(filter: $filter, skip: $skip, limit: $limit, search: $search) {
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
