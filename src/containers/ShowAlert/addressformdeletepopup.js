/* eslint-disable react/prop-types */
// import React from "react";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { DeleteSkuidflag } from "../../containers/MyAccount/actions";
import reducer from '../../containers/MyAccount/reducer';
import saga from '../../containers/MyAccount/saga';
// import CheckoutAPI from '../MainPage/api/checkout';
import Success from './success';
import CheckoutAPI from '../../containers/MainPage/api/checkout';
function AddressFormDeletePopUp(props) {
  useInjectReducer({ key: 'myAccount', reducer });
  useInjectSaga({ key: 'myAccount', saga });
  const [deleteaddressMsg, setdeleteaddressMsg] = useState('')
  const [deleteaddressMsgStatus, setdeleteaddressMsgStatus] = useState(false)
  const [saveaddress, setAddressSave] = useState(false)
  const myaccountReducer = useSelector(state => state.myAccount)
  const dispatch = useDispatch()
  console.log("myaccountReducer", myaccountReducer)
  const cancelpopup = () => {
    // setViewCart(true)
    dispatch(DeleteSkuidflag(false))
  }
  const Yescheckout = (customeraddressID) => {
    CheckoutAPI.deleteaddress(customeraddressID, myaccountReducer && myaccountReducer.deletedaddId)
      .then(response => {
        setdeleteaddressMsgStatus(true)
        setdeleteaddressMsg(response)
        // toast("Item deleted successfully")
        console.log(response);
        //   alert('deleted')
        // setsavecartlistitem(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }
  useEffect(() => {
    if (deleteaddressMsgStatus === true) {
      // setdeleteaddressMsg('Address deleted successfully')
      setTimeout(() => {
        setdeleteaddressMsgStatus(false)
        setAddressSave(true)
      }, 1000);
    }
  }, [deleteaddressMsgStatus])
  useEffect(() => {
    if (saveaddress === true) {
      dispatch(DeleteSkuidflag(false))
      props.Fetchlist()
    }
  }, [saveaddress])
  const closemsg = () => {
    setdeleteaddressMsgStatus(false)
  }
  // console.log("deleteMsgStatus", deleteMsgStatus, deleteMsg);
  return (
    <>
      {/* { myaccountReducer && myaccountReducer.flag===true ?  */}
      {deleteaddressMsgStatus && <Success msg={deleteaddressMsg} close={closemsg} />}
      <div className="modal show" id="RemoveAddressModal" style={{ paddingRight: '17px', display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body text-center">
              <button type="button" className="close" data-dismiss="modal" onClick={cancelpopup}>×</button>
              <div>
                <ul>
                  <li><p>Would you like to remove address?</p></li>
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
// AddressFormDeletePopUp.propTypes = {};
export default (AddressFormDeletePopUp)