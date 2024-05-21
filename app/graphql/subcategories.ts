import { gql } from '@apollo/client';

export const FIND_SUB_CATEGORIES = gql`
  query FindSubcategories(
    $filter: SubcategoryFilter
    $skip: Int
    $search: SubcategorySearch
    $limit: Int
  ) {
    findSubcategories(
      filter: $filter
      skip: $skip
      search: $search
      limit: $limit
    ) {
      count
      subcategories {
        id
        name
        active
        category
        categoryId
      }
    }
  }
`;

export const FIND_SUB_CATEGORY = gql`
  query FindSubcategoryById($id: String!) {
    findSubcategoryById(id: $id) {
      id
      name
      active
      category
      categoryId
    }
  }
`;

export const CREATE_SUB_CATEGORY = gql`
  mutation CreateSubcategory($input: CreateSubcategoryDto!) {
    createSubcategory(input: $input) {
      id
      name
      active
      category
      categoryId
    }
  }
`;

export const UPDATE_SUB_CATEGORY = gql`
  mutation UpdateSubcategory($id: String!, $input: UpdateSubcategoryDto!) {
    updateSubcategory(id: $id, input: $input) {
      id
      name
      active
      category
      categoryId
    }
  }
`;
