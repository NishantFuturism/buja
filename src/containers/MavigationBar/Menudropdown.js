/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
////import history from '../../utils/history';
import { useRouter } from 'next/router';
function Menudropdown(props) {
  const router = useRouter();
  console.log("props..", props)
  const [enablecollapse, setenablecollapse] = useState(false)
  function productlistpage(pageurl, patrentcaturl) {
    // console.log('pmyy', 'pageurl', pageurl, 'patrentcaturl', patrentcaturl);
    props.disablediv()
    localStorage.setItem('PLPCat', pageurl)
    localStorage.setItem('PLPparenturl', patrentcaturl)
    return router.push(`/${pageurl}`, { isURLChange: pageurl })
  }
  // const html = document.documentElement;
  // const menu = document.getElementById('dropdowsubnmenu');
  // function closeMenu() {
  //   // add class to the menu to make it show
  //   // add event listener to the html element
  //   html.removeEventListener('click', closeMenuOnBodyClick);
  // }
  // function closeMenuOnBodyClick(event) {
  //   const path = event.composedPath();
  //   // check if it has the menu element
  //   if (path.some(elem => elem.id === 'dropdowsubnmenu')) {
  //     // terminate this function if it does
  //     return;
  //   }
  //   closeMenu();
  // }
  return (
    <li className="mega-parent" >
      <Link onClick={() => productlistpage(props.itm.SubSubMenus[0].PageUrl, props.itm.PageUrl)}>
        {props.itm.DisplayName}
        {console.log("maincategory", `${props.itm.DisplayName}`)}
      </Link>
      <span className="lnr lnr-chevron-down"></span>
      {enablecollapse ?
        <ul className="dropdown" id='dropdowsubnmenu'>
          {props.itm.SubSubMenus.map((subItm) => (
            < li >
              <Link onClick={() => productlistpage(subItm.PageUrl, props.itm.PageUrl)}>
                {subItm.DisplayName}
              </Link>
            </li>
          ))}
        </ul>
        : null}
      <Link className="mean-expand"
        onClick={() => setenablecollapse(!enablecollapse)}
        href="#" style={{ fontSize: '18px' }}>+</Link>
    </li>
  )
}
export default Menudropdown;
