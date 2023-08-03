import React, { useState, useEffect, useRef } from 'react';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useDispatch, useSelector } from 'react-redux';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { savedeliveryfeedback, CheckReview } from './actions';
import reducer from './reducer';
import saga from './saga';
import Success from '../../components/ShowAlert/success';
function FeedbackDelivery(props) {
  /* eslint-disable react/prop-types */
  const { closebar, setClosebar } = props;
  useInjectReducer({ key: 'feedbackdelivery', reducer });
  useInjectSaga({ key: 'feedbackdelivery', saga });
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [showmsg, setShowmsg] = useState('');
  const [currentdate, setCurrentdate] = useState('')
  const [day, setDay] = useState('')
  const [ratingfeedback, setRatingFeedback] = useState(0)
  const [hover, setHover] = useState(0)
  // const [editStar, seteditStar] = useState(0)
  const [editingText, setEditingText] = useState("")
  const oldText = useRef("");
  const FDelivery = useSelector(state => state.feedbackdelivery)
  console.log("fdelivery...", FDelivery)
  useEffect(() => {
    getCurrentDate();
  }, [])
  function getCurrentDate() {
    const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const Day = Days[today.getDay()]
    const date = `${today.getDate()} ${Months[today.getMonth()]} ${today.getFullYear()}`;
    const cDate = date;
    setCurrentdate(cDate)
    setDay(Day)
  }
  useEffect(() => {
    console.log("fdeli..", FDelivery)
    if (FDelivery && FDelivery.giventhereview === false) {
      setShowmsg("Feedback successfully submitted")
    }
    else if (FDelivery && FDelivery.giventhereview === true && FDelivery.giventhereview !== false) {
      setShowmsg("You have Already submitted")
      // setClosebar(true)
    }
    else {
      console.log("nothing")
    }
  }, [FDelivery])
  const savefeedback = () => {
    setShow(true)
    const textarea = document.getElementById('txtcommentdelivery').value
    oldText.current = textarea;
    setEditingText(oldText.current)
    const orderN = window.atob(localStorage.getItem('OrderNumber'))
    const savefdata = {
      "OrderNumber": orderN,
      "FeedbackreviewId": 0,
      "FeedbackTypeId": 2,
      "OrderItemId": 0,
      "Rating": ratingfeedback,
      "Pros": textarea,
      // "Cons": "",
      "Comment": textarea,
      "IsApprovedByAdmin": true,
      "FeedbackDate": currentdate
    }
    dispatch(savedeliveryfeedback(savefdata))
    dispatch(CheckReview(savefdata))
    setClosebar(false)
  }
  const ratefeedback = (value) => {
    console.log("chkeee..", value)
    setRatingFeedback(value)
  }
  useEffect(() => {
    setInterval(() => {
      setShow(false);
    }, 4000);
  }, [closemsg])
  const closemsg = () => {
  }
  const handletext = (e) => {
    setEditingText(e.target.value)
    localStorage.setItem("inputcommentValue", e.target.value);
  }
  useEffect(() => {
    setEditingText(localStorage.getItem("inputcommentValue"));
  }, []);
  const handlerating = (key) => {
    const setstar = key;
    // seteditStar(e.target.value)
    localStorage.setItem("inputstarValue", setstar);
  }
  useEffect(() => {
    // seteditStar(localStorage.getItem("inputstarValue"));
    localStorage.getItem("inputstarValue");
  }, []);
  return (
    <>
      {show && <Success msg={showmsg} close={closemsg} />}
      {closebar ? <div className="modal fade show" id="DeliveryfeedbackModal" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog modal-mg">
          <div className="modal-content ">
            <div className="modal-header">
              <h5><b>Delivery Feedback</b></h5>
              <button type="button" className="close" data-dismiss="modal" onClick={() => setClosebar(false)} style={{ color: '#000000' }}>x</button> <br />
            </div>
            <div className="modal-body">
              <div>
                <span style={{ color: 'forestgreen', fontSize: '30px' }}><b>Delivered</b></span>
              </div>
              <div>
                <label>Order delivered on {day}, {currentdate}</label>
              </div>
              <div style={{ marginTop: '20px' }}>
                <h4><b>Rate your delivery experience</b></h4>&nbsp;&nbsp;
              </div>
              <div>
                {[...Array(5)].map((star, index) => {
                  const ifeedb = index + 1;
                  // console.log("chkindex..", index)
                  return (
                    <FontAwesomeIcon
                      type='button'
                      key={ifeedb}
                      icon={faStar}
                      // value={editStar}
                      onChange={handlerating}
                      color={ratingfeedback >= ifeedb ? "orange" : "lightgrey"}
                      style={{ fontSize: '1.5em', borderColor: 'orange' }}
                      className={index < (hover || ratingfeedback) ? 'on' : 'off'}
                      // selected={index < selectedrating}
                      // {console.log("checkvalue..", e.target.value)}                     
                      // onClick={setSelectedRating(index + 1)}
                      onClick={() => ratefeedback(ifeedb)}
                      onMouseEnter={() => setHover(ifeedb)}
                      onMouseLeave={() => setHover(ratingfeedback)}
                    />
                    // <span>
                    //   {/* <i color={ratingfeedback >= index ? "yellow" : "white"}></i> */}
                    //   <i className={index === ratingfeedback ? "ratingstardelivery fa fa-2x checked fa-star" : "ratingstardelivery fa fa-star-o fa-2x checked"} ></i>
                    // </span>
                  );
                })}
              </div>
              <div>
                <input name="ratingvaluedelivery" type="hidden" id="ratingvaluedelivery" value="0" />
                <input name="DeliveryFeedbackreviewId" type="hidden" value="0" id="DeliveryFeedbackreviewId" />
              </div>
              <div style={{ marginTop: '20px' }}>
                <label htmlFor="comment-id">
                  {/* <input type="text" id="comment-id" /> */}
                  <b> Comments  :</b>
                </label>
              </div>
              <div>
                <textarea rows="3" id="txtcommentdelivery" value={editingText} onChange={handletext}
                  // onKeyUp={onPressEnter}
                  cols="" style={{ width: '80%' }} placeholder="Please enter comments here about your experience with the seller."></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" id="submitfeedback" className="btn btn-success"
                onClick={() => savefeedback()}><b>Submit Feedback</b></button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setClosebar(false)}><b>Cancel</b></button><br />
            </div>
          </div>
        </div>
      </div> : null}
    </>
  )
}
export default FeedbackDelivery;