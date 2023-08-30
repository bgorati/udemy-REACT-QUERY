import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from 'react-query';
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetched, isError, error } = useInfiniteQuery(
    'sw-people',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined
    }
  );
  if (isFetched) return <div>Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;


  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
    {data.pages.map((pageData) => {
      return pageData.results.map((persons) => {
        return (
          <Person
            key={persons.name}
            name={persons.name}
            hairColor={persons.hair_color}
            eyeColor={persons.eye_color}
          />
        )
      })
    })}
  </InfiniteScroll>;
}
