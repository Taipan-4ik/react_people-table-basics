const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const PeopleFromServer = async () => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const peopleList = await response.json();

  return peopleList;
};
