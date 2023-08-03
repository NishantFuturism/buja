/* eslint-disable react/prop-types */
/**
 *
 * SubNavigation
 *
 */
import React, { memo, useEffect, useState } from 'react';
//import { useLocation } from 'react-router-dom';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
// //import history from '../../utils/history';
function SubNavigation(props) {
  const [breadcrumb, setbreadcrumb] = useState('');
  const [subcatCount, setSubcatCount] = useState('');
  //const location = useLocation()
  const router = useRouter();
  
  const SubcategoryState = useSelector(state => state.subcategory)
  console.log("SubcategoryStatenavigation=", SubcategoryState);
  //console.log("propssubnavigation=", props);
  useEffect(() => {
    if (router) {
      
      // const name = location.charAt(0).toUpperCase()
      // console.log('bvggh', name);
      const linkPath = router.asPath.split('/');
      console.log("logginginsubc2",linkPath);
      linkPath.shift();
      const pathArray = linkPath.map((path, i) => ({ breadcrumb: path, href: `/${linkPath.slice(0, i + 1).join('/')}` }));
      setbreadcrumb(pathArray);
    }
  }, [router]);
  /*useEffect(() => {
    setbreadcrumb(props && props.URL && props.URL.map((path, i) => ({ breadcrumb: path, href: `/${props.URL.slice(0, i + 1).join('/')}` })))
  }, [props])*/
  useEffect(() => {
    if (SubcategoryState !== undefined && SubcategoryState.advanceSkusListingByFilterModels.length !== 0) {
      setSubcatCount(SubcategoryState.advanceSkusListingByFilterModels[0].overAllCount)
    }
  }, [SubcategoryState, router])
  if (!breadcrumb) {
    return null;
  }
  if (!breadcrumb) {
    return null;
  }
  console.log('sslocation'+breadcrumb);
  // const routes = [
  //   { path: '/Search/', breadcrumb: 'Search' },
  //   { path: '/example', breadcrumb: 'Custom Example' },
  //   // { path: '/custom-props, breadcrumb: CustomPropsBreadcrumb, ,}
  // ]
  return (
    <div key='nav' className="breadcrumb-area plp-breadcrumb-style">
      <div className={`container-fluid ${router.pathname.includes("/category/") ? 'subcategory-page' : ''}`}>
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-wrap">
              <nav aria-label="breadcrumb" className='d-flex align-items-center'>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  {breadcrumb.filter(data => data.breadcrumb !== 'category').map(data =>
                    <li className="breadcrumb-item active" aria-current="page"
                    // onClick={handleclik}
                    >
                      <a href={`${data.href}`} style={{ color: '#333131' }}>
                        {data.breadcrumb.charAt(0).toUpperCase() + data.breadcrumb.slice(1).toLowerCase()}
                      </a> </li>)}
                  <li>
                    <span className='prodCount' style={{ marginLeft: "5px", fontSize: "16px", color: '#6c757d' }}></span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
SubNavigation.propTypes = {};
export default memo(SubNavigation);
