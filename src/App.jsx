import * as React from 'react';

const Item = ({ item, onRemoveItem }) => {
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </li>
  );
};

const List = ({ list, onRemoveItem }) => {
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );
};

const InputWithLabel = ({ id, value, type = 'text', isFocused, onInputChange, children }) => {
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


const App = () => {
  console.log("App renders");
  const initialStories = [
    {
      title: 'React',
      url: 'https://reactjs.org',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1
    }
  ];

  const getAsyncStories = () =>
    new Promise((resolve) =>
      resolve({ data: { stories: initialStories } })
    );

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const [searchTerm2, setSearchTerm2] = useStorageState('search2', 'foo');

  const handleSearch2 = (event) => {
    setSearchTerm2(event.target.value);
  }

  const [stories, setStories] = React.useState([]);

  React.useEffect(() => {
    getAsyncStories().then(result => {
      setStories(result.data.stories);
    });
  }, []);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter((story) => item.objectID !== story.objectID);
    setStories(newStories);
  }

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel value={searchTerm} onInputChange={handleSearch} id="search1">
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      <List list={stories} onRemoveItem={handleRemoveStory} />

      <hr />

      <InputWithLabel value={searchTerm2} onInputChange={handleSearch2} id="search2" label="Headline:" isFocused />

      <hr />

      <h2>{searchTerm2}</h2>

    </div>
  );
};

export default App;
