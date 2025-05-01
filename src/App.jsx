import * as React from 'react';

const Item = ({ title, url, author, num_comments, points }) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);

const List = ({ list }) => (
  <ul>
    {list.map(({ objectID, ...item }) => (
      <Item key={objectID} {...item} />
    ))}
  </ul>
);

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
  const stories = [
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

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const [searchTerm2, setSearchTerm2] = useStorageState('search2', 'foo');

  const handleSearch2 = (event) => {
    setSearchTerm2(event.target.value);
  }

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel value={searchTerm} onInputChange={handleSearch} id="search1">
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      <List list={stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()))} />

      <hr />

      <InputWithLabel value={searchTerm2} onInputChange={handleSearch2} id="search2" label="Headline:" isFocused />

      <hr />

      <h2>{searchTerm2}</h2>

    </div>
  );
};

export default App;
