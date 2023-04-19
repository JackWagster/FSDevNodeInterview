import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBook } from 'app/shared/model/book.model';
import { getEntities as getBooks } from 'app/entities/book/book.reducer';
import { getEntity, updateEntity, createEntity, reset } from './book-store.reducer';
import { IBookStore } from 'app/shared/model/book-store.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBookStoreUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookStoreUpdate = (props: IBookStoreUpdateProps) => {
  const [idsbook, setIdsbook] = useState([]);
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { bookStoreEntity, books, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/book-store');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getBooks();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...bookStoreEntity,
        ...values,
        books: mapIdList(values.books),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fsDevNodeInterviewApp.bookStore.home.createOrEditLabel" data-cy="BookStoreCreateUpdateHeading">
            Create or edit a BookStore
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bookStoreEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="book-store-id">ID</Label>
                  <AvInput id="book-store-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="bookStoreNameLabel" for="book-store-bookStoreName">
                  Book Store Name
                </Label>
                <AvField id="book-store-bookStoreName" data-cy="bookStoreName" type="text" name="bookStoreName" />
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="book-store-postalCode">
                  Postal Code
                </Label>
                <AvField id="book-store-postalCode" data-cy="postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="book-store-city">
                  City
                </Label>
                <AvField id="book-store-city" data-cy="city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="stateProvinceLabel" for="book-store-stateProvince">
                  State Province
                </Label>
                <AvField id="book-store-stateProvince" data-cy="stateProvince" type="text" name="stateProvince" />
              </AvGroup>
              <AvGroup>
                <Label for="book-store-book">Book</Label>
                <AvInput
                  id="book-store-book"
                  data-cy="book"
                  type="select"
                  multiple
                  className="form-control"
                  name="books"
                  value={!isNew && bookStoreEntity.books && bookStoreEntity.books.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {books
                    ? books.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.title}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/book-store" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  books: storeState.book.entities,
  bookStoreEntity: storeState.bookStore.entity,
  loading: storeState.bookStore.loading,
  updating: storeState.bookStore.updating,
  updateSuccess: storeState.bookStore.updateSuccess,
});

const mapDispatchToProps = {
  getBooks,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookStoreUpdate);
