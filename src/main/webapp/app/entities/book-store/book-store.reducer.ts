import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction,
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBookStore, defaultValue } from 'app/shared/model/book-store.model';

export const ACTION_TYPES = {
  FETCH_BOOKSTORE_LIST: 'bookStore/FETCH_BOOKSTORE_LIST',
  FETCH_BOOKSTORE: 'bookStore/FETCH_BOOKSTORE',
  CREATE_BOOKSTORE: 'bookStore/CREATE_BOOKSTORE',
  UPDATE_BOOKSTORE: 'bookStore/UPDATE_BOOKSTORE',
  PARTIAL_UPDATE_BOOKSTORE: 'bookStore/PARTIAL_UPDATE_BOOKSTORE',
  DELETE_BOOKSTORE: 'bookStore/DELETE_BOOKSTORE',
  RESET: 'bookStore/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBookStore>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type BookStoreState = Readonly<typeof initialState>;

// Reducer

export default (state: BookStoreState = initialState, action): BookStoreState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BOOKSTORE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BOOKSTORE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BOOKSTORE):
    case REQUEST(ACTION_TYPES.UPDATE_BOOKSTORE):
    case REQUEST(ACTION_TYPES.DELETE_BOOKSTORE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_BOOKSTORE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BOOKSTORE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BOOKSTORE):
    case FAILURE(ACTION_TYPES.CREATE_BOOKSTORE):
    case FAILURE(ACTION_TYPES.UPDATE_BOOKSTORE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_BOOKSTORE):
    case FAILURE(ACTION_TYPES.DELETE_BOOKSTORE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOOKSTORE_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_BOOKSTORE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BOOKSTORE):
    case SUCCESS(ACTION_TYPES.UPDATE_BOOKSTORE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_BOOKSTORE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BOOKSTORE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/book-stores';

// Actions

export const getEntities: ICrudGetAllAction<IBookStore> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BOOKSTORE_LIST,
    payload: axios.get<IBookStore>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IBookStore> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BOOKSTORE,
    payload: axios.get<IBookStore>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBookStore> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BOOKSTORE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IBookStore> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BOOKSTORE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IBookStore> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_BOOKSTORE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBookStore> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BOOKSTORE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
