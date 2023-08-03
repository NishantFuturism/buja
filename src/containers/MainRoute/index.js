/**
 *
 * MainRoute
 *
 */
import React from 'react';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
// import '../../../assets1/css/default.min.css';
// // import '../../../public/assets1/css/bundle.css';
// import '../../../assets1/css/responsive.min.css';
// import '../../../assets1/css/style.min.css';
import { ToastContainer } from 'react-toastify';
import HomePage from '../HomePage/index';
import reducer from './reducer';
import saga from './saga';
import 'react-toastify/dist/ReactToastify.css';
export function MainRoute() {
  useInjectReducer({ key: 'mainRoute', reducer });
  useInjectSaga({ key: 'mainRoute', saga });
  // const [Megamainmenu, setMegamainmenu] = useState([]);
  // const data = localStorage.getItem('googlesignindata',);
  // const dispatch = useDispatch()
  // const menubar = useSelector(state => state.mainRoute)
  // useEffect(() => {
  //   if (menubar !== undefined) {
  //     setMegamainmenu(menubar.megaMenuResp);
  //   }
  // }, [menubar]);
  // useEffect(() => {
  //   if (Megamainmenu.length === 0) { dispatch(megaMenuAction()) }
  // }, []);
  return (
    <>
      {/* <FormattedMessage {...messages.header} /> */}
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <HomePage />
    </>
  );
}
export default MainRoute
