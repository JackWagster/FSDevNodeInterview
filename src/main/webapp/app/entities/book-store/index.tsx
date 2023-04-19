import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BookStore from './book-store';
import BookStoreDetail from './book-store-detail';
import BookStoreUpdate from './book-store-update';
import BookStoreDeleteDialog from './book-store-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BookStoreUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BookStoreUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BookStoreDetail} />
      <ErrorBoundaryRoute path={match.url} component={BookStore} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BookStoreDeleteDialog} />
  </>
);

export default Routes;
