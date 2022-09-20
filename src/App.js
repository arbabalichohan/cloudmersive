import './App.css';
import Main from './components/Main';

function App() {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Apikey": "05cf0721-5479-42be-a7a4-fca4be3e79bb"
  };
  return (
    <div className="App text-center">
      <div className="py-3 bg-dark text-light mb-5">
          <h1>
              Cloudmersive NLP API
          </h1>
      </div>
      <div className="row">
        <div className="col col-4 mx-auto">
          <Main headers={headers}/>
        </div>
      </div>
    </div>
  );
}

export default App;
