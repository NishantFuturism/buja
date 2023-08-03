/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Orderreviewlistitem(props) {
  const [ratingproduct, setRatingproduct] = useState(0)
  const [hoverorder, setHoverorder] = useState(0)
  const [editingProductText, setEditingProductText] = useState("")
  const [currentdate, setCurrentdate] = useState('')
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
  // console.log("ratingproduct..", props.ratingproduct)
  // const ratingproductorder = (value) => {
  function ratingproductorder(value) {
    const orderN = window.atob(localStorage.getItem('OrderNumber'))
    const productcomment = (document.getElementById(`feedbackItemReviewDetail_${props.data.OrderItemID}__Comment`).value)
    setRatingproduct(value)
    console.log("chkid..", value)
    const productDetails = {
      // ProductImage: `${props.data.ProductImage}`,
      // ProductName: `${props.data.ProductName}`,
      // PackSize: `${props.data.PackSize}`,
      // OrderItemID: `${props.data.OrderItemID}`,
      // ratingproduct: ratingproduct,
      // editingProductText: editingProductText
      FeedbackreviewId: 0,
      OrderId: "",
      OrderNumber: orderN,
      OrderItemID: props.data.OrderItemID,
      ProductImage: `${props.data.ProductImage}`,
      ProductName: `${props.data.ProductImage}`,
      PackSize: `${props.data.PackSize}`,
      FeedbackTypeId: 1,
      Pros: productcomment,
      // "Cons": "string",
      Reviewtitle: "",
      Rating: value,
      Comment: productcomment,
      IsApprovedByAdmin: false,
      FeedbackDate: currentdate
    }
    props.onRatingtoProductReview(productDetails);
  }
  const handleproducttext = (e) => {
    e.preventDefault();
    setEditingProductText(e.target.value)
    // console.log("chkvalueofe..", e.target.value)
    const ratingValId = e.target.id;
    const regexForm = /(.*?_)(\d+|\w+)(__.*)/;
    const finalRatingValId = ratingValId.replace(regexForm, '$2');
    console.log(`printing rating value 2${finalRatingValId}`);
    const ratingElemVal = document.getElementById(finalRatingValId);
    if (ratingElemVal) {
      console.log('printing rating value outer loop')
      const childRatingElem = ratingElemVal.children;
      console.log(`printing rating value outer loop 2${childRatingElem.length}`);
      for (let i = 0; i < childRatingElem.length; i += 1) {
        console.log('printing rating value inner loop')
        const child = childRatingElem[i];
        child.removeAttribute("pointer-events");
      }
    }
    // props.onRatingtoProductReview(ratingproduct);
    // localStorage.setItem("inputproductcommentValue", e.target.value);
  }
  // useEffect(() => {
  //   setEditingProductText(localStorage.getItem("inputproductcommentValue"));
  // }, []);
  return (
    <tr>
      <td>
        {console.log("chkimg..", `${props.data.ProductImage}`)}
        <img src={props.data.ProductImage} alt="" style={{ width: '60px', height: '60px' }} />
      </td>
      <td>
        {console.log("chkthev..", `${props.data.ProductName}`)}
        {props.data.ProductName}
      </td>
      <td>
        {console.log("chksize..", `${props.data.PackSize}`)}
        {props.data.PackSize}
      </td>
      <td>
        <div className="row ">
          {console.log("chkorderitemid..", `${props.data.OrderItemID}`)}
          <span id={props.data.OrderItemID}>
            {[...Array(5)].map((star, index) => {
              const proindex = index + 1;
              return (
                props.data && props.data.Rating && props.data.Rating > 0 ?
                  <FontAwesomeIcon
                    id={`${props.data.OrderItemID}`}
                    type="button"
                    key={proindex}
                    icon={faStar}
                    pointerEvents="none"
                    color={props.data.Rating >= proindex ? "orange" : "lightgrey"}
                    style={{ fontSize: '1.5em', borderColor: 'orange' }}
                    className={index <= (hoverorder || ratingproduct) ? "on" : "off"}
                    onClick={() => ratingproductorder(proindex)}
                    onMouseEnter={() => setHoverorder(proindex)}
                    onMouseLeave={() => setHoverorder(ratingproduct)}
                  >
                    {console.log("chk-index-id..", proindex, `${props.data.OrderItemID}`)}
                  </FontAwesomeIcon>
                  :
                  <FontAwesomeIcon
                    id={`${props.data.OrderItemID}`}
                    type="button"
                    key={proindex}
                    icon={faStar}
                    pointerEvents="none"
                    color={ratingproduct >= proindex ? "orange" : "lightgrey"}
                    style={{ fontSize: '1.5em', borderColor: 'orange' }}
                    className={index <= (hoverorder || ratingproduct) ? "on" : "off"}
                    onClick={() => ratingproductorder(proindex)}
                    onMouseEnter={() => setHoverorder(proindex)}
                    onMouseLeave={() => setHoverorder(ratingproduct)}
                  >
                    {console.log("chk-index-id..", proindex, `${props.data.OrderItemID}`)}
                  </FontAwesomeIcon>
              );
            })}
          </span>
        </div>
      </td>
      <td id={props.data.OrderItemID}>
        {
          props.data && props.data.Rating && props.data.Rating > 0 ?
            <textarea id={`feedbackItemReviewDetail_${props.data.OrderItemID}__Comment`} value={props.data.Pros} onChange={(e) => handleproducttext(e)} placeholder='Comment here to rate this product' name="feedbackItemReviewDetail[0].Comment" style={{ width: '100%' }}></textarea>
            :
            <textarea id={`feedbackItemReviewDetail_${props.data.OrderItemID}__Comment`} value={editingProductText} onChange={(e) => handleproducttext(e)} placeholder='Comment here to rate this product' name="feedbackItemReviewDetail[0].Comment" style={{ width: '100%' }}></textarea>
        }
      </td>
    </tr >
  )
}
export default Orderreviewlistitem;