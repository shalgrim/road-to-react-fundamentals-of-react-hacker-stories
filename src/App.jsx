/* eslint-disable no-unused-vars */
import * as React from 'react';
import axios from 'axios';
import _ from 'lodash';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const Item = ({ item, onRemoveItem }) => {
  return (
    <li style={{ display: 'flex' }}>
      <span style={{ width: '40%' }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: '30%' }}>{item.author}</span>
      <span style={{ width: '10%' }}>{item.num_comments}</span>
      <span style={{ width: '10%' }}>{item.points}</span>
      <span style={{ width: '10%' }}>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </li>
  );
};

const List = ({ list, onRemoveItem }) => {
  const [sortState, setSortState] = React.useState({ sortBy: 'title', sortOrder: 'asc' });

  const onChangeSort = (sortBy) => {
    if (sortState.sortBy === sortBy) {
      setSortState({
        ...sortState,
        sortOrder: sortState.sortOrder === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortState({
        sortBy,
        sortOrder: 'asc',
      });
    }
  };

  return (
    <ul>
      <li>
        <span>
        <button type="button" onClick={() => onChangeSort('title')}>
          Sort by Title {sortState.sortBy === 'title' ? (sortState.sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
        </span>
        <span>
        <button type="button" onClick={() => onChangeSort('num_comments')}>
          Sort by Comments {sortState.sortBy === 'num_comments' ? (sortState.sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
        </span>
        <span>
        <button type="button" onClick={() => onChangeSort('points')}>
          Sort by Votes {sortState.sortBy === 'points' ? (sortState.sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
        </span>
        </li>
          <li style={{ display: 'flex' }}>
            <span style={{ width: '40%' }}>Title</span>
            <span style={{ width: '30%' }}>Author</span>
            <span style={{ width: '10%' }}>Comments</span>
            <span style={{ width: '10%' }}>Points</span>
            <span style={{ width: '10%' }}>Actions</span>
          </li>
          {_.orderBy(list,
            [sortState.sortBy],
            [sortState.sortOrder]
          ).map((item) => (
            <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
          ))}
        </ul>
  );
};

const InputWithLabel = ({ id, value, type = 'text', isFocused, onInputChange, children }) => {
  // I think somewhere in the next 10 lines or so
  // is why it's broken and when I type in the second input box
  // the focus moves to the first input box
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input ref={inputRef} id={id} type={type} value={value} autoFocus={isFocused} onChange={onInputChange} />
      &nbsp;
    </>
  );
};

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REMOVE_STORY:
      return {
        ...state,
        data: state.data.filter(
          (story) => story.objectID !== action.payload.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const REMOVE_STORY = 'REMOVE_STORY';
const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await axios.get(url);
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: REMOVE_STORY,
      payload: item
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const [searchTerm2, setSearchTerm2] = useStorageState('search2', 'foo');

  const handleSearch2 = (event) => {
    setSearchTerm2(event.target.value);
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchAction = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const SearchForm = ({
    searchTerm,
    onSearchInput,
    searchAction,
  }) => (
    <form action={searchAction}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={onSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <button
        type="submit"
        disabled={!searchTerm}
      >
        Submit
      </button>
    </form>
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        searchAction={searchAction}
      />

      <hr />

      {stories.isError && <p>Something went wrong...</p>}

      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List
          list={stories.data}
          onRemoveItem={handleRemoveStory}
        />
      )}

      <hr />

      <InputWithLabel value={searchTerm2} onInputChange={handleSearch2} id="search2" label="Headline:" isFocused />

      <hr />

      <h2>{searchTerm2}</h2>

    </div>
  );
};

export default App;
