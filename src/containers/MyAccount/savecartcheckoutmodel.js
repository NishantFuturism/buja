import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
//import history from '../../utils/history';
import { loadsavecheckoutpopup, savecartcheckout } from './actions';
import reducer from './reducer';
import saga from './saga';
import { useRouter } from 'next/router';

export default function Savecartcheckoutmodel() {
  useInjectReducer({ key: 'myAccount', reducer });
  useInjectSaga({ key: 'myAccount', saga });
  const myaccountReducer = useSelector(state => state.myAccount)
  const dispatch = useDispatch()
  const [ViewCart, setViewCart] = useState(false)
  const router = useRouter();

  const cancelpopup = () => {
    dispatch(loadsavecheckoutpopup(false))
  }
  useEffect(() => {
    if (ViewCart) {
      router.push('/cart', { savecart: myaccountReducer.savecart })
    }
  }, [ViewCart])
  const Yescheckout = () => {
    dispatch(savecartcheckout(myaccountReducer.namecart,true))
    setViewCart(true)
  }
  const Nocheckout = () => {
    dispatch(savecartcheckout(myaccountReducer.namecart,false))
    setViewCart(true)
    // history.push('/account/savedcartlist/savedcartlistitem', { savecart: myaccountReducer.savecart })
  }
  return (
    <div className="modal show" id="SaveCartcheckoutModel" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body text-center">
            <button type="button" className="close" data-dismiss="modal" onClick={cancelpopup}>×</button>
            <div>
              <ul>
                <li><p>Would you like to merge saved items with existing cart items?</p></li>
                <li><p>If no, then the existing cart items will get detached from the cart.</p></li>
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={Yescheckout} type="button">Yes</button>
            <button className="btn btn-danger" onClick={Nocheckout} type="button">No</button>
          </div>
        </div>
      </div>
    </div>
  )
}
