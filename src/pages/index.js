import Link from 'next/link';
import Header from '../components/Header';
import App from '../containers/App'
import MainRoute from '@/containers/MainRoute';
import configureStore from '@/configureStore';
import { Provider } from 'react-redux';
const initialState = {};
const store = configureStore(initialState);

const Home = () => {
  return (
    <>
      <Provider store={store}>
        <MainRoute />
      </Provider>
    </>

    /*<div style={{ padding: "3rem" }}>
      <h1>Hello, World!</h1>
      <p>Welcome to my Next.js project.</p>
      <Header />
      <ul>
        <li>
          <Link href="/about">
            <span>About Page</span>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <span>Contact Page</span>
          </Link>
        </li>
      </ul>
  </div>*/
  );
};

export default Home;