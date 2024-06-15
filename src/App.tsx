import { Provider } from 'react-redux';
import store from './components/Redux/store';
import CreateNewTask from './components/CreateNewTask';
import Main from './components/Main'
import './App.css'
import  Footer from './components/Footer/index';

function App() {
  

  return (
    <Provider store={store}>
     
      <CreateNewTask/>
      <br />
      <br />
      <Main/>
      <br />
      <Footer/>
     </Provider>
  )
}

export default App
