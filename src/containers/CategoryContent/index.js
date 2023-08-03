/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
/**
 *
 * CategoryContent
 *
 */
import { groupBy } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import '../../../public/assets1/css/bundle.css';
import '../../../public/assets1/css/responsive.min.css';
import '../../../public/assets1/css/style.min.css';
import { ShimmerThumbnail } from "react-shimmer-effects";
////import history from '../../utils/history';
import reducer from './reducer';
import saga from './saga';
import makeSelectCategoryContent from './selectors';
import './categorycontent.css'
export function CategoryContent() {
  useInjectReducer({ key: 'categoryContent', reducer });
  useInjectSaga({ key: 'categoryContent', saga });
  const [homeScreensDAta, sethomeScreensDAta] = useState([]);
  const [groupedData, setGroupedData] = useState();
  const homeScreenstate = useSelector(state => state.homeScreen)
  const shimmerdata = [{ 'id': 1 }, { 'id': 2 }, { 'id': 3 }, { 'id': 4 }, { 'id': 5 }, { 'id': 6 },]
  // const groupBy = (x, f) => x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {});
  useEffect(() => {
    if (homeScreensDAta && homeScreensDAta.length !== 0) {
      setGroupedData(Object.entries(groupBy(homeScreensDAta, v => v.SectionName)))
    }
  }, [homeScreensDAta])
  useEffect(() => {
    if (homeScreenstate !== undefined) {
      sethomeScreensDAta(homeScreenstate.category)
    }
  }, [homeScreenstate])
  // function productlistpage(patrentcaturl) {
  //   console.log('patrentcaturl', patrentcaturl);
  //   const url = patrentcaturl.split('/')
  //   console.log({ url });
  //   localStorage.setItem('PageUrl', window.btoa(url[2]))
  //   // localStorage.setItem('PLPCat', pageurl)
  //   // localStorage.setItem('PLPparenturl', patrentcaturl.split('/'))
  //   return history.push(`/Subcategory/${patrentcaturl}`,)
  // }
  function productlistpage(pageurl, patrentcaturl) {
    localStorage.setItem('PLPCat', pageurl)
    localStorage.setItem('PLPparenturl', pageurl)
    // return history.push(`/${pageurl}`, { isURLChange: pageurl })
  }
  return (
    <div>
      <>
        {groupedData && groupedData.length > 0 ?
          <section
            style={{ backgroundColor: '#D9FFE2' }}
            className="pt-10 pb-10"
          >
            <div
              className="container-fluid"
              style={{ backgroundColor: '#D9FFE2' }}
            >
              <div className="">
                <div className="col-lg-12">
                  <h2 style={{ fontSize: '1.6em', lineHeight: '34px' }}>Shop by Category</h2>
                </div>
              </div>
            </div>
          </section>
          : null}
      </>
      <section className="categoryholder">
        <div className="container-fluid pt-20 pb-20">
          {/* {groupedData && <h3>{groupedData[0][0]}</h3>} */}
          {groupedData && groupedData.map(arr => (
            <>
              <h3>{arr[0]}</h3>
              <div className="row catboxcate">
                {arr[1].map(itm => (
                  <div className="col-lg-2 col-sm-6 col-xs-6 col-6">
                    <div>
                      <Link href={itm.PageUrl}><img referrerPolicy='no-referrer' src={itm.CategoryImage} alt={itm.ImageAlt} style={{ width: '300px' }} onClick={() => productlistpage(itm.PageUrl)} />
                        <span>{itm.DisplayName}</span></Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ))}
        </div>
      </section>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  categoryContent: makeSelectCategoryContent(),
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(CategoryContent);
