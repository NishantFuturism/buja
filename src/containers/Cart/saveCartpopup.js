/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../../../public/assets1/css/bundle.css';
import '../../../public/assets1/css/default.min.css';
import '../../../public/assets1/css/responsive.min.css';
import '../../../public/assets1/css/style.min.css';
// import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-bootstrap';
////import history from '../../utils/history';
import { useRouter } from 'next/router';
import SaveCartAPI from '../MainPage/api/savecart';
import { savecardpopup, } from './actions';
import Success from '../../components/ShowAlert/success';
import { isOpenMyCartAction } from '../MavigationBar/actions';
export default function SaveCartpopup() {
  const router = useRouter();
  const [deleteMsg, setdeleteMsg] = useState('')
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const [save] = useState(false)
  // const [savecartname, setsavecartname] = useState()
  const [cartName, setCartName] = useState('')
  const [cartNameError, setCartNameError] = useState()
  const [savedCartList, setSavedCartList] = useState()
  const [isError, setIsError] = useState(false)
  const dispatch = useDispatch()
  const loadsavecardpopup = () => {
    dispatch(savecardpopup(false))
  }
  const handlechangeCartName = (e) => {
    if (e.target.value === undefined || e.target.value === '' || e.target.value === null) {
      setCartName('');
      setCartNameError(true)
    }
    if (e.target.value.match("^[a-zA-Z0-9][\sa-zA-Z0-9 ]*$") !== null) {
      setCartName(e.target.value);
      setCartNameError(false)
    }
    if (e.target.value.length === 0) {
      setCartName('');
      setCartNameError(true)
    }
  }
  function savecart() {
    // dispatch(saveCartname(document.getElementById('listName').value))
    if (cartName === '' || cartName === undefined) {
      setCartNameError(true)
    }
    else {
      if (savedCartList && savedCartList.length === 0) {
        SaveCartAPI.addsavecart(cartName)
          .then(response => {
            if (response) {
              router.push('/account/savedcartlist')
              dispatch(savecardpopup(false))
              setShowSuccessMsg(true)
            }
          })
          .catch(error => {
            console.log('error:::', error);
          });
      }
      if (savedCartList && savedCartList.length !== 0) {
        SaveCartAPI.addsavecart(cartName)
          .then(response => {
            // if (response) {
            console.log("response", response)
            // response Cart saved successfully
            // response Cart name already exist
            if (response === 'Cart saved successfully') {
              setShowSuccessMsg(true)
              setIsError(false)
              setdeleteMsg('Cart saved successfully')
              setTimeout(() => {
                setShowSuccessMsg(false)
                setdeleteMsg('')
                dispatch(savecardpopup(false))
                router.push('/account/savedcartlist')
              }, 1000)
            } else {
              setShowSuccessMsg(true)
              setIsError(true)
              setdeleteMsg('Cart name already exist')
              // setShowSuccessMsg('Cart name already exist')
              dispatch(savecardpopup(true))
              setTimeout(() => {
                setShowSuccessMsg(false)
                setShowSuccessMsg('')
                setCartName('')
              }, 1000)
            }
          })
          .catch(error => {
            console.log('error:::', error);
          });
        // dispatch(savecardpopup(true))
        // setShowSuccessMsg(true)
        // setdeleteMsg('Cart name already exist')
        // // setShowSuccessMsg('Cart name already exist')
        // setTimeout(() => {
        //   setShowSuccessMsg(false)
        //   setShowSuccessMsg('')
        //   setCartName('')
        // }, 1000)
        // return false
      }
    }
    // else {
    //   setShowSuccessMsg(true)
    //   SaveCartAPI.addsavecart(cartName)
    //     .then(response => {
    //       if (response) {
    //         router.push('/account/savedcartlist')
    //         dispatch(savecardpopup(false))
    //       }
    //     })
    //     .catch(error => {
    //       console.log('error:::', error);
    //     });
    // }
  }
  useEffect(() => {
    fetchlist()
  }, [])
  function fetchlist() {
    // alert('fetchlist--')
    // setloading(true)
    SaveCartAPI.savecartlisting({})
      .then(response => {
        // setloading(false)
        console.log('response--', response)
        setSavedCartList(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }
  // useEffect(() => {
  //   if (showSuccessMsg === true) {
  //     setdeleteMsg('Cart saved successfully')
  //     setTimeout(() => {
  //       setShowSuccessMsg(false)
  //       setsave(true)
  //     }, 1000);
  //   }
  // }, [showSuccessMsg])
  useEffect(() => {
    if (save === true) {
      dispatch(isOpenMyCartAction(false))
    }
  }, [save])
  const closemsg = () => {
    setShowSuccessMsg(false)
  }
  return (
    <>
      {showSuccessMsg && <Success msg={deleteMsg} isError={isError} close={closemsg} />}
      {/* <ToastContainer /> */}
      <div className="modal show" id="SaveCartModel" style={{ paddingRight: '17px', display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body text-center">
              <button type="button" className="close" onClick={loadsavecardpopup}>×</button>
              <div className="savedcart-modal">
                <ul>
                  <li>
                    <input
                      type="text"
                      className="form-control"
                      id="listName"
                      name="listName"
                      placeholder="Enter Cart Name"
                      onChange={(e) => handlechangeCartName(e)}
                      value={cartName}
                    />
                    {cartNameError === true ?
                      /* errors.LastName && */
                      <div className="text text-danger field-validation-valid" style={{ textAlign: 'left' }} >
                        Please enter cart name.
                      </div> : null
                    }
                  </li>
                  <li>
                    <button onClick={savecart}
                      className="btn btn-secondary btn-success savecart" type="submit" style={{ marginTop: '2px', marginLeft: '5px' }}>Save Cart</button> </li>
                  <li><label id="savecartmsg" ></label></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
