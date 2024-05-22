import { gql } from '@apollo/client';

export const FIND_STORES = gql`
  query FindStores(
    $filter: StoreFilter
    $search: StoreSearch
    $skip: Int
    $limit: Int
  ) {
    findStores(filter: $filter, skip: $skip, search: $search, limit: $limit) {
      stores {
        id
        name
        active
      }
      count
    }
  }
`;

export const FIND_STORE = gql`
  query FindStoreById($id: String!) {
    findStoreById(id: $id) {
      id
      name
      active
    }
  }
`;

export const CREATE_STORE = gql`
  mutation CreateStore($input: CreateStoreDto!) {
    createStore(input: $input) {
      id
      name
      active
    }
  }
`;

export const UPDATE_STORE = gql`
  mutation UpdateStore($id: String!, $input: UpdateStoreDto!) {
    updateStore(id: $id, input: $input) {
      id
      name
      active
    }
  }
`;
