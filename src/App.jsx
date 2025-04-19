import * as React from 'react';

const Item = ({ item: {title, url, author, num_comments, points}, key }) => (
  <li key={key}>
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
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Search = ({ search, onSearch }) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={search} onChange={onSearch} />
  </div>
);


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

  const [searchTerm, setSearchTerm] = React.useState('React');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      <List list={stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()))} />
    </div>
  );
};

export default App;
