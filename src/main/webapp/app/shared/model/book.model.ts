import { IAuthor } from './author.model';
import { IBookStore } from 'app/shared/model/book-store.model';

export interface IBook {
  id?: number;
  title?: string;
  description?: string | null;
  authors?: IAuthor[] | null;
  bookStores?: IBookStore[] | null;
}

export const defaultValue: Readonly<IBook> = {};
