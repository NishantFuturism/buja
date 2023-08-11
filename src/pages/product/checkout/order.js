/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';
// import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//import { Link, useLocation, useParams } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Stepper from 'react-stepper-horizontal/lib/Stepper';
import { toast, ToastContainer } from 'react-toastify';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import brandlogo from '../../../../public/assets1/img/icon/adibuja-logo.svg';
//import history from '@/utils/history';
import '../../../../public/assets1/css/style.min.css';
import '../../../../public/assets1/css/bundle.css';
// import Constants from '../App/constants';
import { ConstantsValues } from '../../../containers/MainPage/api/homeServices';
import PaymentAPI, { PaymentKey } from '../../../containers/MainPage/api/payment';
import { getpaymentmethod, updateDeliveryslottime } from '../../../containers/ProceedToBuy/actions';
import mycartAPI from '../../../containers/MainPage/api/mycartAPI';
import Warn from '../../../components/ShowAlert/warn';
import 'react-toastify/dist/ReactToastify.css';
//import logoanimation from '../../images/adibuja-logo-animation.gif'
export function OrderPlacemode(props) {
  const [currentdate, setdate] = useState('');
  const [name, setname] = useState('');
  const [amount, setamount] = useState('');
  const [paymentmode, setpaymentmode] = useState('');
  const [paymentType, setpaymentType] = useState();
  const [walletbalance, setwalletbalance] = useState(0);
  const [CustomerAddressId, setCustomerAddressId] = useState('')
  const [DeliverySlotID, setDeliverySlotID] = useState('')
  const [InstructionForDeliverySlot, setInstructionForDeliverySlot] = useState('')
  const [DeliverySlotDate, setDeliverySlotDate] = useState('')
  const [codcheck, setcodcheck] = useState(false)
  const [razor, setrazor] = useState(false)
  const [loading, setloading] = useState(false)
  const [wallet, setwallet] = useState(false)
  const [radiovalue, setradiovalue] = useState('')
  const [buyamount, setbuyamount] = useState(0)
  const [cashdelivery, setCashdelivery] = useState(false)
  const [payonline, setPayonline] = useState(false)
  const [warnstatus, setWarnstatus] = useState(false)
  const [cashdeliverymsg, setCashDeliverymsg] = useState('')
  // const [total, settotal] = useState(false)
  const [userdetail, setuserdetail] = useState({})
  const addToCartRdcr = useSelector(state => state.addToCart)
  const [paymentmethod, setpaymentmethod] = useState('')
  const [walletcheck, setwalletcheck] = useState(false)
  const [codgreateramount, setcodgreateramount] = useState(false)
  const [walletZero, setwalletZero] = useState(false)
  const [warnplacestatus, setwarnplacestatus] = useState(false)
  const [warnplacegmsg, setplacegmsg] = useState('')
  // const [amount, setamount] = useState()
  // const [disableradio, setdisableradio] = useState(false)
  // const [totalamount, settotalamount] = useState('')
  const data = useSelector(state => state.proceedToBuy)
  console.log('SGHSG', { props }, { data });
  //const user = localStorage.getItem('User')
  //console.log("localStorage.getItem('User')==", localStorage.getItem('User'), user);
  const dispatch = useDispatch()
  //const location = useLocation()
  const router = useRouter();

  //console.log('location', location, addToCartRdcr);
  //const state = useParams()
  //console.log('s', state);
  /*useEffect(() => {
    if (user !== undefined) {
      console.log("67")
      setuserdetail({ user })
    }
    // if (props !== undefined) {
    //   setatosuggestdadta(props.atosuggestdadta)
    // }
    //  setwallet(true)
    // razor(true)
  }, [user])*/
  useEffect(() => {
    // dispatch(getcustomerwalletbalance())
    PaymentAPI.getcustomerwalletbalance({})
      .then(response => {
        console.log('uuuuu73', response)
        setwalletbalance(response.WalletBalance)
        if (response.WalletBalance === 0) {
          console.log("76===", response.WalletBalance)
          setwalletZero(true);
        }
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [])
  useEffect(() => {
    mycartAPI.getCartCommon()
      .then(response => {
        console.log('uuuuu', response)
        // setwalletbalance(response.WalletBalance)
        setamount(response.total)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  })
  // useEffect(() => {
  //   if (walletbalance > amount) {
  //     // setdisableradio(true)
  //   }
  // }, [walletbalance, amount])
  // useEffect(() => {
  //   if (data !== undefined) {
  //     setwalletbalance(data.WalletBalance)
  //   }
  // }, [data])
  useEffect(() => {
    // if (props.location.state !== undefined) {
    console.log("window.atob(localStorage.getItem('FromTime')===", localStorage.getItem('FromTime'));
    setCustomerAddressId(window.atob(localStorage.getItem('CustomerAddressId')))
    setDeliverySlotID(window.atob(localStorage.getItem('SlotID')))
    setInstructionForDeliverySlot(window.atob(localStorage.getItem('Instruction')))
    setDeliverySlotDate(localStorage.getItem('FromTime'))
    // }  
  }, [])
  //console.log('locationlocalStorage', localStorage.getItem('totalamount'));
  useEffect(() => {
    const encodedFirstName = window.btoa(localStorage.getItem('UserFirstName'));
    const userdata = encodedFirstName;
    setname(userdata)
    getCurrentDate()
  }, []);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
    }
    script.onerror = () => {
      console.log('error');
    };
    document.body.appendChild(script);
  }, []);
  function getCurrentDate() {
    const tempDate = new Date();
    const date = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
    const currDate = date;
    setdate(currDate)
  }
  // useEffect(() => {
  //   if (wallet && razor) {
  //     setpaymentmode('WR')
  //   }
  // }, [wallet, razor])
  //console.log('paymeny', paymentmode);
  const makepayment = (event) => {
    //console.log("paymentmethodonclick", paymentmode, paymentmethod, buyamount);
    // dispatch(getpaymentmethod(paymentmethod))
    // loadRazorpay()
    mycartAPI.removeInactiveFromCart()
      .then(resp => {
        //console.log("resp", resp);
        if (resp === 'Success') {
          mycartAPI.getCartnew()
            // mycartAPI.getCartCommon()
            .then(response => {
              //console.log('uuuuu', response)
              // setwalletbalance(response.WalletBalance)
              if (response[0].Total === 30) {
                setwarnplacestatus(true)
                setplacegmsg('Sorry! There are no items in the cart which are available in the selected delivery locality.')
                setTimeout(() => {
                  setwarnplacestatus(false)
                }, 3000);
              } else if (response[0].Total > 0) {
                //console.log("cartReducer==response==", buyamount, response[0].Total);
                if (buyamount === response[0].Total - response[0].CouponValue) {
                  // setamount(response[0].Total)
                  if (!event.detail || event.detail === 1) {
                    if (paymentmode === 'C') {
                      console.log('paymeny', radiovalue);
                      dispatch(getpaymentmethod(paymentmethod))
                      CODpayment()
                    } else if (paymentmode === 'R') {
                      dispatch(getpaymentmethod(paymentmethod))
                      loadRazorpay()
                    } else if (paymentmode === 'WR') {
                      dispatch(getpaymentmethod(paymentmethod))
                      loadRazorpay()
                    } else if (paymentmode === 'W') {
                      dispatch(getpaymentmethod(paymentmethod))
                      CODpayment()
                    }
                    // else if (paymentmode === 'WR' && razor && wallet) {
                    //   loadRazorpay()
                    // }
                    else {
                      console.log('othersbhs');
                    }
                  }
                } else {
                  console.log("cartReducer==response==", buyamount, response[0].Total);
                  // setwarnplacestatus(false)
                  // setplacegmsg('Your cart has been updated!!!,')
                  // setamount(response[0].Total)
                  setTimeout(() => {
                    setwarnplacestatus(false)
                    if (!event.detail || event.detail === 1) {
                      if (paymentmode === 'C') {
                        console.log('paymeny', radiovalue);
                        dispatch(getpaymentmethod(paymentmethod))
                        CODpayment()
                      } else if (paymentmode === 'R') {
                        dispatch(getpaymentmethod(paymentmethod))
                        loadRazorpay()
                      } else if (paymentmode === 'WR') {
                        dispatch(getpaymentmethod(paymentmethod))
                        loadRazorpay()
                      } else if (paymentmode === 'W') {
                        dispatch(getpaymentmethod(paymentmethod))
                        CODpayment()
                      }
                      // else if (paymentmode === 'WR' && razor && wallet) {
                      //   loadRazorpay()
                      // }
                      else {
                        console.log('othersbhs');
                      }
                    }
                  }, 4000);
                }
              } else {
                setwarnplacestatus(true)
                setplacegmsg('Sorry! There are no items in the cart,')
                setTimeout(() => {
                  setwarnplacestatus(false)
                  router.push({ pathname: '/' })
                }, 4000);
              }
            })
            .catch(error => {
              console.log('error:::', error);
            });
        }
      })
  }
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  // useEffect(() => {
  // }, [radiovalue])
  console.log('userdeatil', userdetail);
  // const token = `cnpwX3Rlc3RfVkNzblBYUFBoR1lQSkM6UDIzdTR5Rlp1alBEb0ZhT3I2NGU3MGZD`
  const loadRazorpay = () => {
    const RemAmount = paymentmode === 'WR' ? buyamount * 100 : amount * 100
    console.log("RemAmount", RemAmount);
    // dispatch(getinitTtansaction(currentdate, amount, paymentmode))
    PaymentAPI.initiatetransaction(paymentmode)
      .then(response => {
        if (response) {
          localStorage.setItem('transactionid', response)
          const databody = {
            currency: ConstantsValues.currencyCode,
            amount: RemAmount,
            // testing details
            key: 'rzp_test_VCsnPXPPhGYPJC',
            secret: 'P23u4yFZujPDoFaOr64e70fC',
            // live details
            // key: 'rzp_live_a2drmSnqSRpolp',
            // secret: 'MRYJDKpRs4fiT1oSxzi0M9NC',
            orderId: "",
            paymentId: "",
            signature: "",
            date: currentdate,
            TransactionGuid: response,
            errors: "",
            message: "",
            status: "",
            description: "",
            PaymentMethod: paymentmode
          }
          console.log("databody", databody);
          PaymentAPI.createOrderid(databody)
            .then(respo => {
              console.log('a=resoo', respo);
              localStorage.setItem('orderID', respo)
              const script = document.createElement('script');
              script.src = 'https://checkout.razorpay.com/v1/checkout.js';
              script.async = true;
              script.onload = () => {
              }
              script.onerror = () => {
                console.log('error');
              };
              document.body.appendChild(script);
              const options = {
                "key": PaymentKey.RAZOR_PAY_KEY,
                "amount": amount,
                "currency": ConstantsValues.currencyCode,
                "name": "Adibuja",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": respo,
                "handler": async function (resspo) {
                  console.log('response', resspo);
                  // alert(resspo.razorpay_signature)
                  placeorder({
                    razorpayPaymentId: resspo.razorpay_payment_id,
                    razorpayOrderId: resspo.razorpay_order_id,
                    razorpaySignature: resspo.razorpay_signature,
                  }, data, response, respo)
                  // return fetch(`${Constants.endPoints.payment}${response.razorpay_payment_id}`, {
                  //   method: 'GET',
                  //   // mode: 'no-cors',
                  //   headers: {
                  //     // accept: 'application/json',
                  //     // 'Content-Type': 'application/json',
                  //     // "access-control-allow-origin": "http://localhost:3000/",
                  //     Authorization: `basic ${token}`,
                  //   },
                  // })
                  //   .then(res => res.text())
                  //   .then(addressresponse => {
                  //     console.log('registerresponse', addressresponse)
                  //     // alert(addressresponse)
                  //     // props.fetchaddress()
                  //     // props.cancelform()
                  //   });
                },
                "prefill": {
                  "name": name,
                  "email": localStorage.getItem('UserLastPhone') ? localStorage.getItem('Email') : null,
                  "contact": localStorage.getItem('UserLastPhone') !== "null" ? localStorage.getItem('UserLastPhone') : '9999999999',
                },
                "notes": {
                  "address": "Razorpay Corporate Office"
                },
                "theme": {
                  "color": "#3399cc"
                }
              };
              const paymentObject = new window.Razorpay(options);
              console.log({ paymentObject });
              paymentObject.on('payment.failed', function (getresponse) {
                console.log('getresponse', getresponse)
                // alert(getresponse.error.code);
                // alert(getresponse.error.description);
                // alert(getresponse.error.source);
                // alert(getresponse.error.step);
                // alert(getresponse.error.reason);
                // alert(getresponse.error.metadata.order_id);
                // alert(getresponse.error.metadata.payment_id);
              })
              paymentObject.open();
              // if (response) {
              //   localStorage.setItem('transactionid', response)
              // }
            })
            .catch(error => {
              console.log('error:::', error);
            });
        }
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }
  function placeorder(newdata, recivedata, response, respo) {
    console.log({ paymentType, CustomerAddressId, recivedata });
    // if (newdata.razorpaySignature !== undefined) {
    // if (data !== undefined) {
    const databody = {
      "currency": "INR",
      "signature": newdata.razorpaySignature,
      "amount": buyamount * 100,
      "key": PaymentKey.RAZOR_PAY_KEY,
      "secret": PaymentKey.RAZOR_PAY_SECRET,
      "orderId": respo,
      "paymentId": newdata.razorpayPaymentId,
      "date": currentdate,
      "TransactionGuid": response,
      "errors": "",
      "message": "",
      "status": "",
      "description": "",
      "PaymentMethod": paymentmode
    }
    setloading(true)
    PaymentAPI.placeordercreditcard(localStorage.getItem('transactionid'), paymentType, CustomerAddressId)
      .then(orderres => {
        console.log('uuuuu', orderres)
        if (orderres.Success) {
          localStorage.setItem('OrderNumber', window.btoa(orderres.OrderId))
          PaymentAPI.captutreRazorpay(databody)
            .then(captuure => {
              console.log('uuuuu', captuure)
              if (captuure === 'success') {
                PaymentAPI.razorpayVerifysignature(databody)
                  .then(verify => {
                    console.log('uuuuu', verify)
                    setloading(true)
                    if (verify) {
                      dispatch(updateDeliveryslottime(orderres.OrderId, DeliverySlotDate, DeliverySlotID, InstructionForDeliverySlot))
                      // setloading(true)
                      router.push('/product/checkout/order/paymentsuccess')
                    } else {
                      toast('Payment failed')
                    }
                  })
                  .catch(error => {
                    console.log('error:::', error);
                  });
              } else {
                toast('Something went wrong')
              }
            })
            .catch(error => {
              console.log('error:::', error);
            });
        } else {
          toast('Something went wrong')
        }
      })
      .catch(error => {
        console.log('error:::', error);
      });
    // } else {
    //   Alert('payment cannot procced')
    // }
    // dispatch(captureRazorpay(databody, localStorage.getItem('transactionid'), paymentType, CustomerAddressId, DeliverySlotDate, DeliverySlotID, InstructionForDeliverySlot, amount))
    // }
  }
  function CODpayment() {
    setloading(true)
    PaymentAPI.initiatetransaction(paymentmode)
      .then(response => {
        if (response) {
          setloading(true)
          PaymentAPI.placeordercreditcard(response, paymentType, CustomerAddressId)
            .then(res => {
              console.log(res);
              localStorage.setItem('timeslotupdated', JSON.stringify(res))
              if (res.Success === true) {
                localStorage.setItem('OrderNumber', window.btoa(res.OrderId))
                dispatch(updateDeliveryslottime(res.OrderId, DeliverySlotDate, DeliverySlotID, InstructionForDeliverySlot))
                setloading(true)
                router.push('/product/checkout/order/paymentsuccess',)
              } else {
                toast('Payment failed')
              }
            })
            .catch(error => {
              console.log('error:::', error);
            });
        }
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }
  // useEffect(() => {
  //   if (razor) {
  //     setbuyamount(amount)
  //   }
  // }, [razor])
  // useEffect(() => {
  //   setbuyamount(amount)
  //   // setwallet(true)
  //   // razor(true)
  // }, [amount])
  const handlechange = (e) => {
    console.log('WWW', "walletcheck", walletcheck, razor, e.target.value, e.target.checked, e);
    if (walletcheck === true && (amount > walletbalance)) {
      console.log("398BuyAmount=", buyamount);
      setbuyamount(amount)
      setwalletcheck(!walletcheck)
      setwallet(true)
      setpaymentmode('R')
      setpaymentType(4)
      setpaymentmethod('Wallet')
    } else if (walletcheck === false && (amount > walletbalance)) {
      console.log("407BuyAmount=", buyamount, amount - walletbalance);
      setbuyamount(amount - walletbalance);
      console.log("409 BuyAmount==", buyamount);
      setwalletcheck(!walletcheck)
      setwallet(false)
      setpaymentmode('WR')
      setpaymentType(4)
      // setbuyamount(amount)
      setpaymentmethod('WR')
    } else if (walletcheck === false && (amount < walletbalance)) {
      console.log("handle wallet=", document.getElementsByClassName("paymentmode"))
      setwalletcheck(true)
      setPayonline(true)
      setCashdelivery(true)
      setwallet(true)
      setrazor(false)
      setcodcheck(false)
      setpaymentmode('W')
      setpaymentType(0)
      setpaymentmethod('Wallet')
    } else if (walletcheck === true && (amount < walletbalance)) {
      console.log("handle wallet=")
      setwalletcheck(false)
      setPayonline(false)
      setCashdelivery(false)
      setwallet(false)
      setrazor(true)
      setpaymentmode('R')
      setpaymentType(4)
      setpaymentmethod('Card')
    } else if (walletcheck === true && (amount === walletbalance)) {
      console.log("handle wallet=")
      setwalletcheck(false)
      setPayonline(false)
      setCashdelivery(false)
      setwallet(false)
      setrazor(true)
      setpaymentmode('R')
      setpaymentType(4)
      setpaymentmethod('Card')
    } else if (walletcheck === false && (amount === walletbalance)) {
      console.log("handle wallet=")
      setwalletcheck(true)
      setPayonline(true)
      setCashdelivery(true)
      setwallet(true)
      setrazor(false)
      setcodcheck(false)
      setpaymentmode('W')
      setpaymentType(0)
      setpaymentmethod('Wallet')
    } else {
      console.log("456===");
      setwalletcheck(!walletcheck)
      setPayonline(false)
      setCashdelivery(false)
      setwallet(true)
      setpaymentmode('R')
      setpaymentType(4)
      setpaymentmethod('Card')
    }
    // setrazor(!razor)
    // if(razor===true && walletcheck===true){
    //   setrazor(false)
    // }
  }
  useEffect(() => {
    // if (amount < walletbalance) {
    //   setwallet(true)
    //   // razor(true)
    // }
    console.log("wallet=== amount", walletbalance, amount)
    if (walletbalance > 0) {
      if (amount < walletbalance) {
        console.log("wallet < amount")
        // setwallet(true)
        setwalletcheck(true)
        setpaymentmode('W')
        setbuyamount(amount)
        setCashdelivery(true)
        setPayonline(true)
      }
      if (amount === walletbalance) {
        console.log("wallet == amount 485", amount === walletbalance)
        setwalletcheck(true)
        setwallet(true)
        setwalletZero(false)
        setpaymentmode('W')
        setbuyamount(amount)
        setCashdelivery(true)
        setPayonline(true)
        setrazor(false)
        // document.getElementsByClassName("paymentoptionctr").cursor = ""
      }
      if (amount > 5000) {
        console.log("498=====")
        setcodgreateramount(true)
        setrazor(true)
        setwalletcheck(true)
        setPayonline(false)
        setCashdelivery(true)
        setWarnstatus(true)
        setCashDeliverymsg(`Cash on Delivery is applicable only for bills up to Rs. 5000/-`)
        setTimeout(() => {
          setWarnstatus(false)
        }, 3000);
      }
    }
  }, [amount, walletbalance,])
  useEffect(() => {
    if (codgreateramount && amount > walletbalance) {
      console.log("514=====", codgreateramount)
      setCashdelivery(true)
      setPayonline(false)
      setrazor(true)
      setpaymentmethod('WR')
      setpaymentmode('WR')
      setpaymentType(4)
    }
    if (codgreateramount && amount < walletbalance) {
      console.log("514=====", codgreateramount)
      setCashdelivery(true)
      setPayonline(true)
      setrazor(false)
      setpaymentmode('W')
      setpaymentType(0)
      setpaymentmethod('Wallet')
    }
    if (codgreateramount && amount === walletbalance) {
      console.log("514=====", codgreateramount)
      setCashdelivery(true)
      setPayonline(true)
      setrazor(false)
      setpaymentmode('W')
      setpaymentType(0)
      setpaymentmethod('Wallet')
    }
  }, [codgreateramount,])
  useEffect(() => {
    if (wallet === false) {
      // setbuyamount(amount)
    }
  }, [wallet])
  useEffect(() => {
    console.log("codcheck 526", codcheck);
    if (walletcheck === false && walletbalance === 0 && amount > 5000) {
      setbuyamount(amount)
    }
    if (amount < walletbalance) {
      console.log("codcheck 526", codcheck);
      setwalletcheck(true)
      setPayonline(true)
      setCashdelivery(true)
      setwallet(true)
      setrazor(false)
      setcodcheck(false)
      setpaymentmode('W')
      setpaymentType(0)
      setpaymentmethod('Wallet')
    }
    // if(amount > walletbalance)
    // {
    //   let wa=amount-walletbalance
    //   // setrazor(true)
    //   setwalletcheck(true)
    //   setbuyamount(wa)
    //   setCashdelivery(true)
    //   setPayonline(false)
    //   setrazor(true)
    // }
    // else if ( amount >walletbalance ) {
    //   setbuyamount(amount -walletbalance )
    // }
  }, [wallet])
  useEffect(() => {
    // let wa=
    if (amount > 0) {
      if (walletbalance > 0 && amount > walletbalance) {
        // setrazor(true)
        setwalletcheck(true)
        setwalletZero(false)
        // setbuyamount(wa)
        setCashdelivery(false)
        setPayonline(false)
        setrazor(true)
        setpaymentmethod('WR')
        setradiovalue(4)
        setpaymentmode('WR')
        setpaymentType(4)
      }
      console.log("walletbalance  567", walletbalance, walletcheck, walletZero, wallet)
      if (walletbalance === 0 && walletZero === true) {
        if (amount > 5000) {
          console.log("530 ", amount, walletbalance);
          setwalletZero(true)
          // setwalletcheck(true)
          // setcodcheck(true)
          setrazor(true)
          setCashdelivery(true)
          setPayonline(false)
          // setrazor(true)
          setbuyamount(amount)
          setpaymentType(4)
          setpaymentmethod('R')
          setpaymentmode('R')
          setradiovalue(4)
        } else {
          console.log("kjkjkjkjjkj", walletcheck, codcheck);
          // setwalletcheck(false)
          // setcodcheck(true)
          setwalletZero(true)
          setrazor(true)
          setCashdelivery(false)
          setPayonline(false)
          setbuyamount(amount)
          // setrazor(true)
          setpaymentType(4)
          setpaymentmethod('R')
          setpaymentmode('R')
          setradiovalue(4)
        }
      }
      if (walletbalance > 0 && amount < walletbalance) {
        console.log("codcheck", codcheck);
        setwalletZero(false)
        setcodcheck(false)
        setrazor(false)
        setwalletcheck(true)
        setpaymentmode('W')
        setbuyamount(amount)
        setCashdelivery(true)
        setPayonline(true)
        setpaymentType(0)
      }
      // else {
      //   console.log("codcheck");
      // }
    }
  }, [amount, walletbalance, walletZero])
  useEffect(() => {
    console.log("walletcheck", walletcheck, razor, paymentmethod, amount, walletbalance);
    if (razor === true && walletcheck === true && (amount < walletbalance) && paymentmethod === 'W') {
      console.log("1138 buyamount=")
      setbuyamount(amount - walletbalance)
    }
    else if (razor === true && walletcheck === true && (amount > walletbalance) && paymentmethod === 'WR') {
      console.log("1138 buyamount=")
      setbuyamount(amount - walletbalance)
    }
    if (walletcheck === false && (amount > walletbalance) && paymentmethod === 'WR') {
      console.log("1138 buyamount=")
      setbuyamount(amount - walletbalance)
    }
  }, [razor, walletcheck, paymentmethod, amount, walletbalance])
  // useEffect(() => {
  //   // if (walletbalance !== 0 && razor || wallet) {
  //   if (walletbalance > amount) {
  //     // setcodcheck(true)
  //     setrazor(false)
  //     // setbuyamount(amount - walletbalance)
  //   } else {
  //     setbuyamount(amount - walletbalance)
  //   }
  //   // setbuyamount(amount - walletbalance)
  //   // }
  //   // setbuyamount(amount)
  // }, [wallet, radiovalue])
  const handlechange1 = (e) => {
    console.log('rrrr', e.target.value);
    console.log("iiiiiii", codcheck, razor, walletbalance);
    if (codgreateramount === true && amount > walletbalance) {
      console.log("674===")
      setradiovalue(e.target.value)
      setCashdelivery(true)
      setPayonline(false)
      setcodcheck(false)
      setwalletZero(false)
      setrazor(true)
      setwalletcheck(true)
      setwallet(false)
      setpaymentmethod('Card')
      setpaymentmode('R')
      setpaymentType(4)
    } else if (walletbalance === 0) {
      setwalletZero(true)
      setcodcheck(false)
      setrazor(true)
      setradiovalue(e.target.value)
      setPayonline(false)
      setCashdelivery(false)
      setpaymentmode('R')
      setpaymentType(4)
      setpaymentmethod('Card')
    } else if (walletbalance > 0 && walletbalance > amount && amount < 5000) {
      setwalletcheck(false)
      setCashdelivery(false)
      setcodcheck(false)
      setPayonline(false)
      setrazor(true)
      setpaymentmode('R')
      setpaymentmethod('Card')
      setpaymentType(4)
    } else {
      setradiovalue(e.target.value)
      setwalletcheck(false)
      setPayonline(false)
      setCashdelivery(false)
      setrazor(true)
      setpaymentmode('R')
      setpaymentType(4)
      setcodcheck(false)
      setpaymentmethod('Card')
      setbuyamount(amount)
    }
  }
  const handlechange2 = (e) => {
    console.log('cccc', e.target.value, e);
    setradiovalue(e.target.value)
    console.log("kjkjkjkjjkj", walletcheck, codcheck);
    console.log("ghhsgxhsg", walletcheck, e.target.checked);
    // setcodcheck(true)
    // setrazor(false)
    // if (walletcheck === false && e.target.checked === true) {
    //   console.log("ghhsgxhsg", walletcheck, e.target.checked);
    //   // setcodcheck(false)
    //   // setCashdelivery(false)
    //   setPayonline(false)
    //   setpaymentmode('C')
    //   setpaymentmethod('COD')
    //   setpaymentType(3)
    //   // setcodcheck(false)
    //   setradiovalue(e.target.value)
    // } else 
    if (walletbalance > 0 && walletbalance > amount && amount < 5000) {
      console.log("662cod", walletcheck, codcheck)
      setCashdelivery(false)
      setcodcheck(true)
      setPayonline(false)
      setrazor(false)
      setpaymentmode('C')
      setpaymentmethod('COD')
      setpaymentType(3)
    } else if (codgreateramount === true) {
      setCashdelivery(true)
      setrazor(true)
      setwalletcheck(true)
      setcodcheck(false)
      setpaymentmode('R')
      setpaymentmethod('R')
      setpaymentType(4)
    } else if (walletbalance > 0 && walletbalance < amount && amount < 5000) {
      console.log("662cod", walletcheck, codcheck)
      setCashdelivery(false)
      setcodcheck(true)
      setPayonline(false)
      setrazor(false)
      setpaymentmode('C')
      setpaymentmethod('COD')
      setpaymentType(3)
      setwalletcheck(true)
      setbuyamount(amount)
    } else if (walletbalance === 0 && amount < 5000) {
      setCashdelivery(false)
      setcodcheck(true)
      setPayonline(false)
      setrazor(false)
      setpaymentmode('C')
      setpaymentmethod('COD')
      setpaymentType(3)
      setwalletcheck(true)
      setbuyamount(amount)
    } else if (walletcheck === false && (amount === walletbalance)) {
      console.log("handle wallet=")
      setwalletcheck(true)
      setPayonline(true)
      setCashdelivery(false)
      setwallet(false)
      setrazor(false)
      setcodcheck(true)
      setpaymentmode('C')
      setpaymentmethod('COD')
      setpaymentType(3)
      setbuyamount(amount)
    } else if (walletcheck === true && (amount === walletbalance)) {
      console.log("handle wallet=")
      setwalletcheck(true)
      setPayonline(true)
      setCashdelivery(false)
      setwallet(false)
      setrazor(false)
      setcodcheck(true)
      setpaymentmode('C')
      setpaymentmethod('COD')
      setpaymentType(3)
      setbuyamount(amount)
    }
  }
  console.log("cash deleivery", codcheck, cashdelivery);
  console.log("Amount", amount, "buyamount", buyamount, "walletcheck", walletcheck, "codcheck", codcheck, "walletbalance", walletbalance, "walletZero", walletZero);
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      {warnstatus && <Warn msg={cashdeliverymsg} />}
      {warnplacestatus && <Warn msg={warnplacegmsg} />}
      <div className="login-wrapper pb-35">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <main className="site-main" id="primary">
                <div className="user-login">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                      <div className="section-title text-center">
                        <p align="center" style={{ padding: '10px 0px' }}>
                          <Link href="/">
                            <img referrerPolicy='no-referrer' alt="brand-logo" src='/assets1/img/icon/adibuja-logo.svg' style={{ paddingLeft: '23px' }} width="198px"
                              height="42px" />
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <Stepper
                    barStyle="solid"
                    steps={[{
                      title: 'Sign in',
                      href: '/login/',
                      // onClick() {
                      //   alert("sfsdjkfhksfdhhksdf");
                      // }
                    }, {
                      title: 'Shopping Cart',
                      href: '/cart/',
                      // onClick() {
                      //   alert("sfsdjkfhksfdhhksdf");
                      // }
                    }, {
                      title: 'Address Delivery Slot',
                      href: '/productprocced/checkout',
                      // onClick() {
                      //   alert("sfsdjkfhksfdhhksdf");
                      // }
                    }, {
                      title: 'Payment & Order Placed',
                      // onClick() {
                      //   alert("sfsdjkfhksfdhhksdf");
                      // }
                    }]} activeStep={4} activeColor="#f07100" completeColor="#f07100" />
                </div>
                {/* <div className="col-12">
                <div className="checkout-steps checkout-steps container chkout_stps">
                </div>
              </div> */}
                {loading === true ?
                  <div className='row' style={{ zIndex: 1 }}>
                    <div className='col-lg-12 text-center mt-25 mb-25' >
                      <img src='/images/adibuja-logo-animation.gif' alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
                      {/* <i
                        style={{ justifySelf: 'center' }}
                        className="fa fa-spin fa-spinner fa-4x"></i> */}
                    </div>
                  </div>
                  :
                  <div className='mainbodycontent'>
                    <div className='checkout-wrapper pt-10 pb-70 checkout-wrapper-container'>
                      <div className='container'>
                        <div className='row w-100'>
                          <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                            <main id="primary" className="site-main">
                              <div className="user-actions-area">
                                <div className="row">
                                  <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                                    {loading ? <div className='row' style={{ zIndex: 1 }}>
                                      <div className='col-lg-12 text-center mt-25 mb-25' >
                                        <img src='/images/adibuja-logo-animation.gif' alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
                                        {/* <i
                                          style={{ justifySelf: 'center' }}
                                          className="fa fa-spin fa-spinner fa-4x"></i> */}
                                      </div>
                                    </div> : null}
                                    <div className='checkout-area'>
                                      <div className='row'>
                                        {/* {loading === true ?
                                        <div className='row' style={{ zIndex: 1 }}>
                                          <div className='col-lg-12 text-center mt-25 mb-25' >
                                            <i
                                              style={{ justifySelf: 'center' }}
                                              className="fa fa-spin fa-spinner fa-4x"></i>
                                          </div>
                                        </div>
                                        : */}
                                        <div id="divPayment" className="col-12 col-sm-12 col-md-12 col-lg-12">
                                          <div id="payment_stage" className="checkout-form">
                                            <div className="section-title left-aligned">
                                              <h3 style={{ textTransform: 'none' }}>Amount to pay: <span id="final_amount"> ₹{amount}</span></h3><br />
                                            </div>
                                            <div className="col-lg-12 checkoutPadding" >
                                              <div>
                                                {/* <Form.Check
                                                  type="checkbox"
                                                  // className="custom-checkbox"
                                                  disabled={!!(walletbalance === 0 || codcheck)}
                                                  id="disabledFieldsetCheck"
                                                  label={`Wallet Balance (₹ ${walletbalance})`}
                                                  onChange={(e) => handlechange(e)}
                                                /> */}
                                                {/* <div className="custom-checkbox" style={{ marginTop: '10px' }}>
                                                <input type="checkbox"
                                                  onChange={(e) => handlechange(e)}
                                                  name="paymentmodewallet"
                                                  id="wallet" checked={wallet} style={{ width: '2%' }} disabled={!!(walletbalance === 0 || codcheck)} />
                                                <label className="wall_lab_tx" htmlFor="wallet" >Wallet Balance (₹ {walletbalance.toFixed(2)})</label><br />
                                                <span className="checkmark"></span>
                                              </div> */}
                                                <div className="custom-checkbox" style={{ marginTop: '10px', opacity: (codcheck || walletZero === true) ? 0.2 : 1 }}>
                                                  <label className="wall_lab_tx" htmlFor="wallet"
                                                    style={{ cursor: (codcheck || walletZero === true) ? 'not-allowed' : 'pointer' }}>
                                                    <input type="checkbox" onChange={(e) => handlechange(e)} name="paymentmodewallet" id="wallet"
                                                      disabled={!!codcheck || walletbalance === 0}
                                                      checked={!!walletcheck}
                                                      // checked={wallet}
                                                      value="W" />
                                                    Wallet Balance (₹{walletbalance.toFixed(2)})<br />
                                                    {/* {(codcheck || walletZero === true) ? <FontAwesomeIcon icon="fa-solid fa-check" /> : <FontAwesomeIcon icon="fa-regular fa-check" /> */}
                                                    {/* <FontAwesomeIcon icon="fa-regular fa-check" /> */}
                                                    {/* <span className={(codcheck || walletZero === true) ? null : "checkmark"}></span> */}
                                                  </label>
                                                </div>
                                                <div className="divwalletnote">
                                                  NOTE : Wallet Balance will be applicable on Pay Online only.
                                                </div>
                                                <div id="divPay"
                                                // className='paymentoptionctr'
                                                // style={{ opacity: razor === false ? 0.2 : 1 }}
                                                >
                                                  {/* <div className="custom-radio cod_radio"> */}
                                                  <div className="custom-radio cod_radio" style={{ opacity: payonline || razor === false ? 0.2 : 1 }}>
                                                    {/* <label className="paymentoptionctr"> */}
                                                    <label className="paymentoptionctr" >
                                                      <b> Pay Online
                                                        <br />(Debit / Credit Card, UPI, Net Banking etc.)</b>
                                                      <input type="radio" name="paymentmode"
                                                        // disabled={walletbalance !== 0 || razor === false}
                                                        checked={razor}
                                                        // disabled={walletcheck === false}
                                                        // disabled={walletbalance !== 0}
                                                        onChange={(e) => handlechange1(e)} id="razorpay" value="4" />
                                                      <span className={payonline ? null : "checkmark"}></span>
                                                    </label>
                                                    {/* <span className="checkmark"></span> */}
                                                    {/* <input
                                                        type="radio"
                                                        name='payment'
                                                        defaultChecked={razor}
                                                        // checked={razor}  
                                                        onChange={(e) => handlechange1(e)}
                                                        value='Pay Online'
                                                      />
                                                      <label>Pay Online
                                                        <br />
                                                        (Debit / Credit Card, UPI, Net Banking etc.)
                                                      </label> */}
                                                  </div>
                                                  <div className="custom-radio cod_radio" style={{ opacity: 1 }}>
                                                    <label className="paymentoptionctr" style={{ cursor: cashdelivery ? 'not-allowed' : 'pointer' }}>
                                                      <b>Cash On Delivery</b>
                                                      <input type="radio"
                                                        checked={codcheck}
                                                        // disabled={walletbalance !== 0 || codcheck === false}
                                                        onChange={(e) => handlechange2(e)} name="paymentmode" id="cod" value="3" />
                                                      <span className={cashdelivery ? null : "checkmark"}></span>
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-12 amt_btn_rW checkoutAmount">
                                              <div className="order-1 w-50">
                                                <input
                                                  onClick={() => router.back()}
                                                  style={{ width: '100%' }} type="button" id="show" className="btn btn-secondary " value="<< Back" />
                                              </div>
                                              <div className="order-lg-last w-50">
                                                <input
                                                  onClick={(e) => makepayment(e)}
                                                  style={{ width: '100%', fontWeight: 'bolder', height: "36px" }} type="button" id="frmsubmit" name="paymentsubmitbtn" className="btn btn-success save razorpaybtn btnproceedtobuy"
                                                  // value={paymentmode === 'C' ? `Place Your Order ( ₹ ${parseFloat(buyamount).toFixed(2)})`:paymentmode === 'W' ? `Proceed To Pay  ₹ ${parseFloat(buyamount).toFixed(2)} From Wallet Balance`:`Proceed To Pay ₹ ${parseFloat(buyamount).toFixed(2)}`} />
                                                  value={`Place Your Order ( ₹${parseFloat(buyamount).toFixed(2)})`} />
                                                <div id="payment_message"></div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </main>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </main>
            </div>
          </div>
        </div >
      </div >
      <div style={{ textAlign: 'center' }} className="check_foot">
        <form id="mc-form" noValidate="true">
        </form>
        <p align="center" style={{ paddingTop: '10px' }}>
          <small>
            <Link href="/delivery-policy" style={{ color: 'dodgerblue' }}>Delivery Policy</Link>&nbsp; &nbsp;
            <Link href="/faq" style={{ color: 'dodgerblue' }}>Help</Link>
          </small>
        </p>
        <div>
          <p align="center" style={{ paddingTop: '0px' }}><small>2023 © Adibuja Private Limited, All Rights Reserved</small>
          </p>
        </div>
      </div>
    </>
  )
}
export default OrderPlacemode;