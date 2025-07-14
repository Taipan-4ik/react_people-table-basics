import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFromServer } from '../utils/fetchPeople';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [people, setPeople] = useState<Person[] | null>(null);
  const { slug } = useParams();

  const personToHighlight =
    people?.find(person => person.slug === slug) || null;

  const getPeopleList = async () => {
    try {
      setLoadingError(false);
      const data = await PeopleFromServer();

      setPeople(data);
    } catch {
      setLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      getPeopleList();
    }, 0);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {loadingError && people === null && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people && people.length !== 0 && (
            <PeopleTable
              people={people}
              personToHighlight={personToHighlight}
            />
          )}
        </div>
      </div>
    </>
  );
};
