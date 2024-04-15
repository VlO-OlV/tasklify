import List from './List';
import Nav from './Nav';
import '../../assets/styles/App.css';

function App() {
  return (
    <div className="app">
      <Nav />
      <main>
        <div className="lists-block">
          <List />
        </div>
      </main>
    </div>
  );
}

export default App;