import List from './List';
import Nav from './Nav';
import '../../assets/styles/App.css';

function App() {
  return (
    <div className="app">
      <Nav />
      <div>
        <List />
      </div>
    </div>
  );
}

export default App;