/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Modal } from "react-bootstrap";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { orderreviewformpdp, savefeedbackorderreview } from './actions';
import OrderdetailAPI from '../MainPage/api/orderdetail';
import reducer from './reducer';
import saga from './saga';
import Orderreviewlistitem from './Orderreviewlistitem'
import Success from '../../components/ShowAlert/success';
function DetailDelivery(props) {
  /* eslint-disable react/prop-types */
  const { closeorder, setCloseorder } = props;
  useInjectReducer({ key: 'detaildelivery', reducer });
  useInjectSaga({ key: 'detaildelivery', saga });
  const dispatch = useDispatch()
  const [currentdate, setCurrentdate] = useState('')
  const [show, setShow] = useState(false);
  const [showmsg, setShowmsg] = useState('');
  const [reviewErrorMsg, setReviewErrorMsg] = useState('');
  const [ratingorder, setRatingOrder] = useState(0)
  // const [ratingproduct, setRatingproduct] = useState()
  const [hoverorder, setHoverorder] = useState(0)
  const [productOrderId, setProductOrderId] = useState([])
  const [orderdetailsanditem, setOrderDetailsAnditem] = useState([])
  const [productid, setProductId] = useState([])
  const [ratingAndCommentAlldata, setRatingAndCommentAlldata] = useState(
    []
    // "FeedbackreviewId": 0,
    // "OrderId": "string",
    // "OrderNumber": orderN,
    // "OrderItemID": 0,
    // "ProductImage": "",
    // "ProductName": "",
    // "PackSize": "",
    // "FeedbackTypeId": 1,
    // "Pros": productcomment,
    // // "Cons": "string",
    // "Reviewtitle": "string",
    // "Rating": ratingproduct,
    // "Comment": productcomment,
    // "IsApprovedByAdmin": true,
    // "FeedbackDate": currentdate
  )
  console.log("ratingAndCommentAlldata", ratingAndCommentAlldata)
  // const [orderdetails, setOrderDetails] = useState([])
  // const [editingText, setEditingText] = useState("")
  // const [editingProductText, setEditingProductText] = useState("")
  const DataDelivery = useSelector(state => state.detaildelivery)
  console.log("chkdataDelivery..", DataDelivery)
  const detailsitems = {
    "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
    "FeedbackTypeId": 1
  }
  useEffect(() => {
    setReviewErrorMsg('');
    OrderdetailAPI.getorderdetailsfeedbackitems(detailsitems)
      .then(response => {
        console.log("chkresp..", response)
        setOrderDetailsAnditem(response)
        const numidorder = `${response.feedbackItemReviewDetail[0].OrderItemID}`;
        console.log("numidorder", numidorder)
        setProductOrderId(numidorder)
        response.feedbackItemReviewDetail.map((saveproductdata) => {
          console.log("responsedata..", `${saveproductdata.OrderItemID}`)
          // setProductId(productid => [productid, `${saveproductdata.OrderItemID}`])
          return (
            setProductId(...productid, saveproductdata.OrderItemID)
          )
        }
        )
      })
      .catch(error => {
        console.log(error);
      });
  }, [props])
  console.log("productid", productid)
  useEffect(() => {
    getCurrentDate()
  }, [])
  function getCurrentDate() {
    const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const date = `${today.getDate()} ${Months[today.getMonth()]} ${today.getFullYear()}`;
    const cDate = date;
    setCurrentdate(cDate)
  }
  useEffect(() => {
    console.log("dataDelivery...", DataDelivery)
    if (DataDelivery && DataDelivery.giventhereview === false) {
      setShowmsg("Review Submitted successfully")
    }
    else {
      console.log("nothing")
    }
  }, [DataDelivery])
  const savefeedbackorder = () => {
    // OrderdetailAPI.getorderdetailsfeedbackitems(detailsitems)
    //   .then(response => {
    //     // console.log("chkresp..", response)
    //     setOrderDetailsAnditem(response)
    //     const numidorder = `${response.feedbackItemReviewDetail[0].OrderItemID}`
    //     console.log("numidorder..", numidorder)
    //   })
    const commenttext = (document.getElementById('feedbackOrderViewModel_Pros').value)
    // const productcomment = (document.getElementById('feedbackItemReviewDetail_0__Comment').value)
    const orderN = window.atob(localStorage.getItem('OrderNumber'))
    const orderdatapdp = {
      "OrderNumber": orderN,
      "FeedbackreviewId": 0,
      "FeedbackTypeId": 1,
      "OrderItemId": 0,
      "Rating": ratingorder,
      "Pros": commenttext,
      // "Cons": "string",
      "Comment": commenttext,
      "IsApprovedByAdmin": true,
      "FeedbackDate": currentdate
    }
    const productdata = {
      "feedbackOrderViewModel": {
        "OrderNumber": orderN,
        "FeedbackreviewId": 0,
        "FeedbackTypeId": 1,
        "OrderItemId": 0,
        "Rating": ratingorder,
        "Pros": commenttext,
        // "Cons": "string",
        "Comment": commenttext,
        "IsApprovedByAdmin": true,
        "FeedbackDate": currentdate
      },
      // "feedbackItemReviewDetail": [
      //   {
      //     "FeedbackreviewId": 0,
      //     "OrderId": "string",
      //     "OrderNumber": orderN,
      //     "OrderItemID": productid,
      //     "ProductImage": "",
      //     "ProductName": "",
      //     "PackSize": "",
      //     "FeedbackTypeId": 1,
      //     "Pros": productcomment,
      //     // "Cons": "string",
      //     "Reviewtitle": "string",
      //     "Rating": ratingproduct,
      //     "Comment": productcomment,
      //     "IsApprovedByAdmin": true,
      //     "FeedbackDate": currentdate
      //   }
      // ]
      "feedbackItemReviewDetail": ratingAndCommentAlldata
    }
    // Added below code to temporaray handle reviews in better way
    // console.log("productdataRATING..", productdata.feedbackOrderViewModel.Rating)
    // console.log("productdataRATING2..", productdata.feedbackItemReviewDetail.length)
    const orderItemsLength = orderdetailsanditem.feedbackItemReviewDetail.length;
    // console.log("llll--" + JSON.stringify(productdata))
    if (productdata.feedbackItemReviewDetail && productdata.feedbackItemReviewDetail.length !== orderItemsLength) {
      setReviewErrorMsg('Please submit your Rating')
      // console.log("productdataRATINGFFF")
    } else if (productdata.feedbackOrderViewModel.Rating !== 0 || (productdata.feedbackItemReviewDetail && productdata.feedbackItemReviewDetail.length !== 0)) {
      setCloseorder(false)
      setShow(true)
      // console.log("productdataRATINGSSS" + JSON.stringify(productdata))
      dispatch(orderreviewformpdp(orderdatapdp))
      // console.log("productdata..", productdata)
      dispatch(savefeedbackorderreview(productdata))
    } else {
      setReviewErrorMsg('Please submit your Rating')
      // console.log("productdataRATINGFFF")
    }
    /* dispatch(orderreviewformpdp(orderdatapdp))
    console.log("productdata..", productdata)
    dispatch(savefeedbackorderreview(productdata)) */
  }
  const rateorderreview = (value) => {
    setRatingOrder(value)
  }
  // const ratingproductorder = (value) => {
  //   console.log('value', value)
  //   setRatingproduct(value)
  //   console.log("detailorder chkid..", value)
  // }
  const onRatingtoProductReview = (value) => {
    // setRatingproduct(value)
    setRatingAndCommentAlldata([...ratingAndCommentAlldata, value])
    // const finalseletItem = [...ratingAndCommentAlldata, value]
    // console.log("finalseletItem==", finalseletItem)
    // uniqueNames = finalseletItem.filter((val, id, disparray) => disparray.indexOf(val) == id);
    // console.log("uniqueNames===", uniqueNames);
    // setRatingAndCommentAlldata(uniqueNames);
  }
  const handletext = (e) => {
    // setEditingText(e.target.value)
    localStorage.setItem("inputcommentValue", e.target.value);
  }
  useEffect(() => {
    // setEditingText(localStorage.getItem("inputcommentValue"));
  }, []);
  const Ratingord = () =>
    <div className="col-md-2 ">
      {[...Array(5)].map((star, index) => {
        const i = index + 1;
        return (
          orderdetailsanditem && orderdetailsanditem.feedbackOrderViewModel && orderdetailsanditem.feedbackItemReviewDetail && orderdetailsanditem.feedbackItemReviewDetail.length ?
            <FontAwesomeIcon
              type="button"
              key={i}
              icon={faStar}
              color={orderdetailsanditem.feedbackOrderViewModel.Rating >= i ? "orange" : "lightgrey"}
              style={{ fontSize: '1.5em', borderColor: 'orange' }}
              className={index <= (hoverorder || ratingorder) ? "on" : "off"}
              onClick={() => rateorderreview(i)}
              onMouseEnter={() => setHoverorder(i)}
              onMouseLeave={() => setHoverorder(ratingorder)}
            >
            </FontAwesomeIcon>
            :
            <FontAwesomeIcon
              type="button"
              key={i}
              icon={faStar}
              color={ratingorder >= i ? "orange" : "lightgrey"}
              style={{ fontSize: '1.5em', borderColor: 'orange' }}
              className={index <= (hoverorder || ratingorder) ? "on" : "off"}
              onClick={() => rateorderreview(i)}
              onMouseEnter={() => setHoverorder(i)}
              onMouseLeave={() => setHoverorder(ratingorder)}
            >
            </FontAwesomeIcon>
        );
      })}
    </div>
  useEffect(() => {
    setInterval(() => {
      setShow(false)
    }, 4000);
  }, [closemsg])
  const closemsg = () => {
  }
  return (
    <>
      {show && <Success msg={showmsg} close={closemsg} />}
      {closeorder ? <Modal show dialogClassName="showmodal w-100 order-review-modal" role="dialog"
        style={{ maxWidth: '90%', maxHeight: '100%', margin: 'auto' }}>
        <div className="modal-content ">
          <div className="modal-header">
            <h2 className="modal-title-site text-center">Order Review</h2>
            <button type="button" className="close" data-dismiss="modal" onClick={() => setCloseorder(false)} style={{ color: '#000000' }}>x</button> <br />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-2">
                <h3><b>Rate this Order</b></h3>
              </div>
              <div className="col-md-10">
                <h3><b>Comment</b></h3>
              </div>
            </div>
            <div className="row" style={{ marginTop: '5px' }}>
              <Ratingord />
              {/* <div className="row" style={{ marginTop: '5px' }}></div> */}
              {orderdetailsanditem && orderdetailsanditem.feedbackOrderViewModel && orderdetailsanditem.feedbackItemReviewDetail && orderdetailsanditem.feedbackItemReviewDetail.length ?
                <div className="col-md-10">
                  <textarea id="feedbackOrderViewModel_Pros" name="feedbackOrderViewModel.Pros" value={orderdetailsanditem && orderdetailsanditem.feedbackOrderViewModel && orderdetailsanditem.feedbackOrderViewModel.Pros ? orderdetailsanditem.feedbackOrderViewModel.Pros : ""} onChange={handletext} placeholder="Comment" style={{ width: '100%' }}></textarea>
                </div>
                :
                <div className="col-md-10">
                  <textarea id="feedbackOrderViewModel_Pros" name="feedbackOrderViewModel.Pros" onChange={handletext} placeholder="Comment" style={{ width: '100%' }}></textarea>
                </div>
              }
              <br />
            </div>
            <br />
            <div className="row">
              {reviewErrorMsg && reviewErrorMsg !== "" ?
                <div className="col-md-12" style={{ color: "red" }} > {reviewErrorMsg}</div>
                : ""
              }
              <h4><b>&nbsp;&nbsp; Product Review</b></h4>
            </div>
            <div style={{ overflowY: 'scroll', maxHeight: '350px', marginTop: '10px', marginBottom: '10px' }}>
              <div id="collapseProduct" role="tabpanel" aria-labelledby="headingTax" data-parent="#cart_accordion">
                <table id="tblOrderDetailwithreview" className="table">
                  <thead>
                    <tr className="thfix">
                      <th><b>Product Image</b></th>
                      <th className="textalignleft" ><b>Product Name</b></th>
                      <th><b>Pack Size</b></th>
                      <th><b>Rating</b></th>
                      <th style={{ textAlign: 'center' }}><b>Comment</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(orderdetailsanditem.feedbackItemReviewDetail || []).map(data =>
                      <Orderreviewlistitem productOrderId={productOrderId} productid={productid} data={data} onRatingtoProductReview={onRatingtoProductReview}
                      />
                    )}
                    {/* {
                      productid.map((id) => {
                        { console.log("proid..", id) }
                        (orderdetailsanditem.feedbackItemReviewDetail || []).map(data =>
                          <Orderreviewlistitem productOrderId={id} productid={productid} data={data} onRatingtoProductReview={onRatingtoProductReview}
                          />
                        )
                      })
                    } */}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                {orderdetailsanditem && orderdetailsanditem.feedbackOrderViewModel && orderdetailsanditem.feedbackItemReviewDetail && orderdetailsanditem.feedbackItemReviewDetail.length ?
                  ""
                  :
                  <button type="button" id="submitfeedback" className="btn btn-success"
                    onClick={() => savefeedbackorder()} ><b>Submit Feedback</b></button>
                }
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setCloseorder(false)}><b>Cancel</b></button><br />
              </div>
            </div>
          </div>
        </div>
      </Modal > : null
      }
    </>
  )
}
export default DetailDelivery;