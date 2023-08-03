import { Provider } from 'react-redux';
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from '@react-oauth/google';
//import { useStore } from '../redux/store';
import configureStore from '@/configureStore';

function MyApp({ Component, pageProps }) {
    const store = configureStore({});

  return (
    <GoogleOAuthProvider clientId="761974021170-sgabqvrl0lli4rjtalfgiqg8trt87aq6.apps.googleusercontent.com">
    <Provider store={store}>
      <CookiesProvider>
      <Component {...pageProps} />
      </CookiesProvider>
    </Provider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;