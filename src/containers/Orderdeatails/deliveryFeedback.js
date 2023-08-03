// /* eslint-disable react/no-array-index-key */
// /* eslint-disable no-param-reassign */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable no-unused-vars */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable jsx-a11y/alt-text */
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { deliveryfeedback, deliveryfeedbackpopup } from './actions';
// import { ratingdata } from './rating';
// // import Modal from 'antd/lib/modal/Modal';
// export default function DeliveryFeedback() {
//   const dispatch = useDispatch()
//   const [currentdate, setdate] = useState('');
//   // const [ratings, setrating] = useState('')
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [slectedinext, setslectedinext] = useState(false)
//   const [closebar, setclosebar] = useState(false)
//   const loaddeliveryfeedbackpopup = () => {
//     dispatch(deliveryfeedbackpopup(false))
//     setclosebar(false)
//   }
//   useEffect(() => {
//     getCurrentDate()
//   })
//   function getCurrentDate() {
//     const tempDate = new Date();
//     const date = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
//     const currDate = date;
//     setdate(currDate)
//   }
//   const cancelpopup = () => {
//     dispatch(deliveryfeedbackpopup(false))
//   }
//   const savefeedback = () => {
//     const textareainput = document.getElementById('txtcommentdelivery').value
//     // console.log("chkv..", document.getElementById('txtcommentdelivery').value)
//     const feedbackbody = {
//       "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
//       // "FeedbackreviewId": 2,
//       "FeedbackTypeId": 2,
//       // "OrderItemId": 0,
//       "Rating": rating,
//       // "Pros": "",
//       // "Cons": "",
//       "Comment": textareainput,
//       "IsApprovedByAdmin": true,
//       "FeedbackDate": currentdate
//     }
//     // dispatch(deliveryfeedback(feedbackbody))
//     dispatch(deliveryfeedbackpopup(false))
//   }
//   function takerating(value, title) {
//     // setrating(value)
//     setslectedinext(true)
//     setRating(value)
//   }
//   console.log('ra', rating);
//   return (
//     <>
//       <div className="modal fade show" id="DeliveryfeedbackModal" role="dialog" style={{ display: 'block' }}>
//         <div className="modal-dialog modal-mg">
//           <div className="modal-content ">
//             <div className="modal-header">
//               <h5><b>Delivery Feedback</b></h5>
//               <button type="button" className="close" data-dismiss="modal" onClick={() => loaddeliveryfeedbackpopup()} isOpen={closebar} style={{ color: '#000000' }}>x</button><br />
//             </div>
//             <div className="modal-body">
//               <div>
//                 <span style={{ color: 'forestgreen', fontSize: '30px' }}><b>Delivered</b></span>
//               </div>
//               <div>
//                 <label>Order delivered on {currentdate}</label>
//               </div>
//               <div style={{ marginTop: '20px' }}>
//                 <h4><b>Rate your delivery experience</b></h4>&nbsp;&nbsp;
//               </div>
//               <div>
//                 <div>
//                   {[...Array(5)].map((star, index) => {
//                     index += 1;
//                     return (
//                       <button
//                         type="button"
//                         key={index}
//                         // className={index === slectedinext ? "ratingstarorder fa fa-star fa-1x checked" : "ratingstarorder fa fa-star-o fa-2x checked"}
//                         className={index <= (hover || rating) ? "on" : "off"}
//                         onClick={() => takerating(index)}
//                         onMouseEnter={() => setHover(index)}
//                         onMouseLeave={() => setHover(rating)}
//                       >
//                         <i
//                           // onClick={() => takerating(data.value, data.title)}
//                           onClick={() => takerating(index)}
//                           className={index === slectedinext && rating ? "ratingstarorder fa fa-star fa-1x checked" : "ratingstarorder fa fa-star-o fa-2x checked"} ></i>
//                       </button>
//                     );
//                   })}
//                 </div>
//                 {/* <span >
//                   {ratingdata.Ratingsarray.map(data =>
//                     <i
//                       onClick={() => takerating(data.value, data.title)}
//                       className={ratings ? "ratingstarorder fa fa-star fa-1x checked" : "ratingstarorder fa fa-star-o fa-2x checked"} ></i>
//                   )}
//                 </span> */}
//                 <input name="ratingvaluedelivery" type="hidden" id="ratingvaluedelivery" value="0" />
//                 <input name="DeliveryFeedbackreviewId" type="hidden" value="0" id="DeliveryFeedbackreviewId" />
//               </div>
//               <div style={{ marginTop: '20px' }}>
//                 <label><b> Comments  :</b></label>
//               </div>
//               <div>
//                 <textarea rows="3" id="txtcommentdelivery"
//                   cols="" style={{ width: '80%' }} placeholder="Please enter comments here about your experience with the seller."></textarea>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" id="submitdeliveryreview" className="btn btn-success"
//                 onClick={savefeedback}
//               ><b>Submit Feedback</b></button>
//               <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={cancelpopup}><b>Cancel</b></button><br />\
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }