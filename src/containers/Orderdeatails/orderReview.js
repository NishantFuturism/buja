// /* eslint-disable no-param-reassign */
// /* eslint-disable react/no-array-index-key */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-shadow */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable jsx-a11y/alt-text */
// import React, { useEffect, useState } from 'react';
// import { useDispatch, } from 'react-redux';
// import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';
// import { Modal, } from "react-bootstrap";
// import OrderdetailAPI from '../MainPage/api/orderdetail';
// import { feedbackpopups, submitordereviefeedback } from './actions';
// import { ratingdata } from './rating';
// import reducer from './reducer';
// import saga from './saga';
// export default function OrderReview() {
//   useInjectReducer({ key: 'orderdeatails', reducer });
//   useInjectSaga({ key: 'orderdeatails', saga });
//   const [reviewproduct, setreviewproduct] = useState([])
//   const [ordernumber, setordernumber] = useState('')
//   // const [rating, setrating] = useState('')
//   const [ratings, setrating] = useState('')
//   const [rating, setRating] = useState(0);
//   const [ratingitem, setratingitem] = useState('')
//   const [currentdate, setdate] = useState('');
//   const [hover, setHover] = useState(0);
//   const dispatch = useDispatch()
//   useEffect(() => {
//     setordernumber(window.atob(localStorage.getItem('OrderNumber')))
//   }, [])
//   useEffect(() => [
//     getCurrentDate()
//   ])
//   function getCurrentDate() {
//     const tempDate = new Date();
//     const date = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
//     const currDate = date;
//     setdate(currDate)
//   }
//   const itemobject =
//   {
//     "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
//     "FeedbackTypeId": 1
//   }
//   useEffect(() => {
//     OrderdetailAPI.getorderdetailsfeedbackitems(itemobject)
//       .then(response => {
//         setreviewproduct(response)
//       })
//       .catch(error => {
//         console.log('error:::', error);
//       });
//   }, [])
//   const cancelpopup = () => {
//     dispatch(feedbackpopups(false))
//   }
//   function takerating(value, title) {
//     setRating(value)
//   }
//   console.log('aa', rating);
//   const submitFeedback = () => {
//     const comment = document.getElementById('feedbackOrderViewModel_Pros').value
//     const Itemcomment = document.getElementById('feedbackItemReviewDetail_0__Comment').value
//     const check = {
//       "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
//       // "FeedbackreviewId": 0,
//       "FeedbackTypeId": 1,
//       // "OrderItemId": 0,
//       "Rating": rating,
//       // "Pros": "string",
//       // "Cons": "string",
//       "Comment": comment,
//       "IsApprovedByAdmin": true,
//       "FeedbackDate": currentdate
//     }
//     const formdata =
//     {
//       "feedbackOrderViewModel": {
//         "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
//         // "FeedbackreviewId": 0,
//         "FeedbackTypeId": 1,
//         // "OrderItemId": 0,
//         "Rating": rating,
//         // "Pros": "string",
//         // "Cons": "string",
//         "Comment": comment,
//         "IsApprovedByAdmin": true,
//         "FeedbackDate": currentdate
//       },
//       "feedbackItemReviewDetail": [
//         {
//           "FeedbackreviewId": 0,
//           "OrderId": "string",
//           "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
//           // "OrderItemID": 0,
//           // "ProductImage": "string",
//           // "ProductName": "string",
//           // "PackSize": "string",
//           "FeedbackTypeId": 1,
//           // "Pros": "string",
//           // "Cons": "string",
//           "Reviewtitle": "string",
//           "Rating": ratingitem,
//           "Comment": Itemcomment,
//           "IsApprovedByAdmin": true,
//           "FeedbackDate": currentdate
//         }
//       ]
//     }
//     dispatch(submitordereviefeedback(formdata, check))
//     dispatch(feedbackpopups(false))
//   }
//   const takeratingItem = (value, title) => {
//     setratingitem(value)
//     console.log('rating',);
//   }
//   const Ratings = () =>
//     <div className="col-md-2 ">
//       {/* <div> */}
//       {[...Array(5)].map((star, index) => {
//         index += 1;
//         return (
//           <button
//             type="button"
//             key={index}
//             className={index <= (hover || rating) ? "on" : "off"}
//             onClick={() => takerating(index)}
//             onMouseEnter={() => setHover(index)}
//             onMouseLeave={() => setHover(rating)}
//           >
//             <i
//               // onClick={() => takerating(data.value, data.title)}
//               className={rating ? "ratingstarorder fa fa-star fa-1x checked" : "ratingstarorder fa fa-star-o fa-2x checked"} ></i>
//           </button>
//         );
//       })}
//       {/* </div> */}
//       {/* <span >
//         {ratingdata.Ratingsarray.map(data =>
//           <i
//             onClick={() => takerating(data.value, data.title)}
//             className="ratingstarorder fa fa-star-o fa-2x checked" title="Very Bad"></i>
//         )}
//       </span> */}
//     </div>
//   return (
//     <Modal show dialogClassName="showmodal w-100 order-review-modal"
//       style={{ maxWidth: '90%', maxHeight: '100%', margin: 'auto' }}>
//       {/* <div className="modal-dialog" >
//         <div className="modal-content"> */}
//       <div className="modal-header">
//         <h2 className="modal-title-site text-center">Order Review</h2>
//         <button type="button" id="orderreviewcancel" className="close" data-dismiss="modal" onClick={cancelpopup}> × </button>
//       </div>
//       <div className="modal-body">
//         <div className="row">
//           <div className="col-md-2">
//             <h3><b>Rate this Order</b></h3>
//           </div>
//           <div className="col-md-10"><h3><b>Comment</b></h3></div>
//         </div>
//         <div className="row" style={{ marginTop: '5px' }}>
//           <div className='col-md-2'>
//             <Ratings />
//           </div>
//           {/* <input data-val="true" data-val-required="The FeedbackreviewId field is required." id="feedbackOrderViewModel_FeedbackreviewId" name="feedbackOrderViewModel.FeedbackreviewId" type="hidden" value="0" />
//             <input id="feedbackOrderViewModel_OrderNumber" name="feedbackOrderViewModel.OrderNumber" type="hidden" value="OC8103" />
//             <input data-val="true" data-val-required="The FeedbackTypeId field is required." id="feedbackOrderViewModel_FeedbackTypeId" name="feedbackOrderViewModel.FeedbackTypeId" type="hidden" value="1" />
//             <input id="feedbackOrderViewModel_FeedbackreviewId" name="feedbackOrderViewModel.FeedbackreviewId" type="hidden" value="0" />
//             <input data-val="true" data-val-required="The OrderItemId field is required." id="feedbackOrderViewModel_OrderItemId" name="feedbackOrderViewModel.OrderItemId" type="hidden" value="0" />
//             <input data-val="true" data-val-required="The Rating field is required." id="feedbackOrderViewModel_Rating" name="feedbackOrderViewModel.Rating" type="hidden" value="0" />
//             <input data-val="true" data-val-required="The TotalOrderItem field is required." id="feedbackOrderViewModel_TotalOrderItem" name="feedbackOrderViewModel.TotalOrderItem" type="hidden" value="3" />
//             <input data-val="true" data-val-required="The IsApprovedByAdmin field is required." id="feedbackOrderViewModel_IsApprovedByAdmin" name="feedbackOrderViewModel.IsApprovedByAdmin" type="hidden" value="False" /> */}
//           <div className="col-md-10">
//             <textarea id="feedbackOrderViewModel_Pros" name="feedbackOrderViewModel.Pros"
//               placeholder="Comment" style={{ width: '100%' }}></textarea>
//           </div>
//           <br />
//         </div>
//         <br />
//         <div className="row">
//           <h4><b>&nbsp;&nbsp; Product Review</b></h4>
//         </div>
//         <div style={{ overflowY: 'scroll', maxHeight: '350px', marginTop: '10px', marginBottom: '10px' }}>
//           <div id="collapseProduct" role="tabpanel" aria-labelledby="headingTax" data-parent="#cart_accordion">
//             <table id="tblOrderDetailwithreview" className="table">
//               <thead>
//                 <tr className="thfix">
//                   <th><b>Product Image</b></th>
//                   <th className="textalignleft" style={{ width: '20%' }}><b>Product Name</b></th>
//                   <th><b>Pack Size</b></th>
//                   <th><b>Rating</b></th>
//                   <th style={{ textAlign: 'center' }}><b>Comment</b></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(reviewproduct.feedbackItemReviewDetail || []).map(data =>
//                   <tr>
//                     <td>
//                       {/* <input id="feedbackItemReviewDetail_0__OrderId" name="feedbackItemReviewDetail[0].OrderId" type="hidden" value="" />
//                       <input id="feedbackItemReviewDetail_0__OrderNumber" name="feedbackItemReviewDetail[0].OrderNumber" type="hidden" value="OC8103" />
//                       <input data-val="true" data-val-required="The OrderItemID field is required." id="feedbackItemReviewDetail_0__OrderItemID" name="feedbackItemReviewDetail[0].OrderItemID" type="hidden" value="41081" />
//                       <input data-val="true" data-val-required="The FeedbackTypeId field is required." id="feedbackItemReviewDetail_0__FeedbackTypeId" name="feedbackItemReviewDetail[0].FeedbackTypeId" type="hidden" value="1" />
//                       <input data-val="true" data-val-required="The FeedbackreviewId field is required." id="feedbackItemReviewDetail_0__FeedbackreviewId" name="feedbackItemReviewDetail[0].FeedbackreviewId" type="hidden" value="2579" />
//                       <input data-val="true" data-val-required="The IsApprovedByAdmin field is required." id="feedbackItemReviewDetail_0__IsApprovedByAdmin" name="feedbackItemReviewDetail[0].IsApprovedByAdmin" type="hidden" value="False" /> */}
//                       <img src={data.ProductImage} style={{ width: '60px', height: '60px' }} />
//                     </td>
//                     <td>
//                       {data.ProductName}
//                     </td>
//                     <td>
//                       {data.PackSize}
//                     </td>
//                     <td>
//                       <div className="row ">
//                         <span>
//                           {ratingdata.Ratingitemsarray.map(data =>
//                             <i className="ratingstarorderitem-0 selectorderitem fa fa-star-o fa-2x checked"
//                               onClick={() => takeratingItem(data.value, data.title)}></i>
//                           )}
//                         </span>
//                         <input data-val="true" data-val-required="The Rating field is required." id="feedbackItemReviewDetail_0__Rating" name="feedbackItemReviewDetail[0].Rating" type="hidden" value="0" />
//                       </div>
//                     </td>
//                     <td>
//                       <textarea id="feedbackItemReviewDetail_0__Comment" name="feedbackItemReviewDetail[0].Comment" style={{ width: '100%' }}></textarea>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <div className="modal-footer">
//         <button type="button" id="submitorderreview" className="btn btn-success"
//           onClick={submitFeedback}
//         ><b>Submit Feedback</b></button>
//         <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={cancelpopup}><b>Cancel</b></button><br />
//         {/* </div>
//         </div> */}
//       </div>
//       {/* <Modal.Header closeButton>
//         <Modal.Title>Modal heading</Modal.Title>
//       </Modal.Header>
//       <Modal.Footer>
//         <Button variant="secondary" >
//           Close
//         </Button>
//       </Modal.Footer> */}
//     </Modal>
//     // </form >
//   )
// }
