/* eslint-disable react/prop-types */
// import React from "react";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import { DeleteSkuidflag } from "../../containers/MyAccount/actions";
import reducer from '../../containers/MyAccount/reducer';
import saga from '../../containers/MyAccount/saga';
import SaveCartAPI from '../../containers/MainPage/api/savecart';
import Success from './success';
function DeletePopUp(props) {
  useInjectReducer({ key: 'myAccount', reducer });
  useInjectSaga({ key: 'myAccount', saga });
  const [deleteMsg, setdeleteMsg] = useState('')
  const [deleteMsgStatus, setdeleteMsgStatus] = useState(false)
  const [save, setsave] = useState(false)
  const myaccountReducer = useSelector(state => state.myAccount)
  const dispatch = useDispatch()
  console.log("myaccountReducer", myaccountReducer)
  const cancelpopup = () => {
    // setViewCart(true)
    dispatch(DeleteSkuidflag(false))
  }
  const Yescheckout = () => {
    SaveCartAPI.removesavecartlistitem(window.atob(localStorage.getItem('listname')), myaccountReducer && myaccountReducer.deletedSkuId)
      .then(response => {
        setdeleteMsgStatus(true)
        //   toast("Item deleted successfully")
        console.log(response);
        //   alert('deleted')
        // setsavecartlistitem(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }
  useEffect(() => {
    if (deleteMsgStatus === true) {
      setdeleteMsg('cart item deleted successfully')
      setTimeout(() => {
        setdeleteMsgStatus(false)
        setsave(true)
      }, 1000);
    }
  }, [deleteMsgStatus])
  useEffect(() => {
    if (save === true) {
      dispatch(DeleteSkuidflag(false))
      props.Fetchlist()
    }
  }, [save])
  const closemsg = () => {
    setdeleteMsgStatus(false)
  }
  console.log("deleteMsgStatus", deleteMsgStatus, deleteMsg);
  return (
    <>
      {/* { myaccountReducer && myaccountReducer.flag===true ?  */}
      {deleteMsgStatus && <Success msg={deleteMsg} close={closemsg} />}
      <div className="modal show" id="RemoveCartItemModal" style={{ paddingRight: '17px', display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body text-center">
              <button type="button" className="close" data-dismiss="modal" onClick={cancelpopup}>×</button>
              <div>
                <ul>
                  <li><p>Would you like to remove cart items?</p></li>
                  <li>
                    <button className="btn btn-secondary" type="button" onClick={Yescheckout}>Yes</button>
                    <button className="btn btn-secondary" type="button" onClick={cancelpopup}>No</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* :
            <></>
        } */}
    </>
  );
}
// DeletePopUp.propTypes = {};
export default (DeletePopUp)
