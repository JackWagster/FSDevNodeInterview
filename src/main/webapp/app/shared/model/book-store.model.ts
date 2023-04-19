import { IBook } from 'app/shared/model/book.model';

export interface IBookStore {
  id?: number;
  bookStoreName?: string | null;
  postalCode?: string | null;
  city?: string | null;
  stateProvince?: string | null;
  books?: IBook[] | null;
}

export const defaultValue: Readonly<IBookStore> = {};
