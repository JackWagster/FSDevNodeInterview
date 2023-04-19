import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './book-store.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBookStoreDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookStoreDetail = (props: IBookStoreDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bookStoreEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bookStoreDetailsHeading">BookStore</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{bookStoreEntity.id}</dd>
          <dt>
            <span id="bookStoreName">Book Store Name</span>
          </dt>
          <dd>{bookStoreEntity.bookStoreName}</dd>
          <dt>
            <span id="postalCode">Postal Code</span>
          </dt>
          <dd>{bookStoreEntity.postalCode}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{bookStoreEntity.city}</dd>
          <dt>
            <span id="stateProvince">State Province</span>
          </dt>
          <dd>{bookStoreEntity.stateProvince}</dd>
          <dt>Book</dt>
          <dd>
            {bookStoreEntity.books
              ? bookStoreEntity.books.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.title}</a>
                    {bookStoreEntity.books && i === bookStoreEntity.books.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/book-store" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/book-store/${bookStoreEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bookStore }: IRootState) => ({
  bookStoreEntity: bookStore.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookStoreDetail);
