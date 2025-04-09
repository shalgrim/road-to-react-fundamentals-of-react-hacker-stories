
const welcome = {
  title: "React",
  greeting: "Hey"
};

var name = "Reacty";

var aList = [1, "two", name];


function App() {
  return (
    <div>
        <h1>{welcome.greeting} {welcome.title}</h1>
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" />
        <ul>
          {aList.map(item => <li>{item}</li>)}
        </ul>
    </div>
  );
}

export default App;
