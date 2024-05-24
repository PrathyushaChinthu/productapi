import { gql } from '@apollo/client';

export const FIND_CATEGORIES = gql`
  query FindCategories(
    $filter: CategoryFilter
    $skip: Int
    $limit: Int
    $search: CategorySearch
  ) {
    findCategories(
      filter: $filter
      skip: $skip
      limit: $limit
      search: $search
    ) {
      categories {
        id
        name
        active
      }
      count
    }
  }
`;

export const FIND_CATEGORY = gql`
  query FindCategoryById($id: String!) {
    findCategoryById(id: $id) {
      id
      name
      active
    }
  }
`;
