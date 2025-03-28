import { InstantSearch, SearchBox } from 'react-instantsearch-dom';

<InstantSearch indexName="terraform_modules" searchClient={algoliaClient}>
  <SearchBox />
</InstantSearch>