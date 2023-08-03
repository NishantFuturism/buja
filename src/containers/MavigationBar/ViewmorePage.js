import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer'
import Header from '../../components/Header'
// import SubNavigation from '../../components/SubNavigation'
import CustomsAPI from '../MainPage/api/homeServices'
// import { ShopBrand } from '../ShopBrand'
// import ToppSellingOriginal from '../ToppSellingOriginal'
import BreadCrumb from '../MyAccount/myAccountBreadcrumb';
// import ToppSellingOriginal from '../ToppSellingOriginal'
// import { TopsellingProduct } from '../TopsellingProduct/index';
import 'react-toastify/dist/ReactToastify.css';
export default function ViewmorePage() {
  const [viemoredata, setviemoredata] = useState();
  // const history = useHistory()
  // const nextData = useSelector(state => state.ToppSelling)
  useEffect(() => {
    CustomsAPI.categoreyServices()
      .then(response => {
        setviemoredata(response)
        console.log("res..", response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [])
  console.log("viemoredata==", viemoredata);
  function productlist(PageUrl, patrentcaturl) {
    console.log("productlist==", PageUrl, patrentcaturl);
    localStorage.setItem('PLPCat', `category/${patrentcaturl}/${PageUrl}`)
    localStorage.setItem('PLPparenturl', `category/${patrentcaturl}`)
    // return router.push(`category/${patrentcaturl}/${PageUrl}`, { isURLChange: `category/${patrentcaturl}/${PageUrl}` })
  }
  function productlistpage(pageurl, patrentcaturl) {
    console.log("productlistpage==", pageurl, patrentcaturl);
    localStorage.setItem('PLPCat', `category/${patrentcaturl}/${pageurl}`)
    localStorage.setItem('PLPparenturl', `category/${patrentcaturl}`)
    // return router.push(`category/${patrentcaturl}/${pageurl}`, { isURLChange: `category/${patrentcaturl}/${pageurl}` })
  }
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <Header />
      <BreadCrumb id="viewmorebreadcrumb" activepage="All Categories" />
      {/* <SubNavigation /> */}
      <div id="divCategoryMenuList">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="main-menu-categories">
                <nav id="mobile-menu">
                  <ul>
                    <li className="static">
                      <ul className="mega-menu mega-full" style={{ cursor: 'pointer' }}>
                        {(viemoredata || []).map(data =>
                          data.SubCatgories !== undefined && data.SubCatgories.length !== 0 &&
                          <li className="mega-title" >
                            {/* <Link to={(data.SubSubMenus.map(subItm => subItm.PageUrl), data.PageUrl)} onClick={() => productlist(data.SubSubMenus.map(subItm => subItm.PageUrl), data.PageUrl,)} >
                              {data.DisplayName}
                            </Link> */}
                            {/* <a href
                              onClick={() => productlist(data.SubSubMenus.map(subItm => subItm.PageUrl), data.PageUrl)}
                            >{data.DisplayName}</a> */}
                            {/* <a href={data.SubCatgories.length === 0 && data.SubCatgories.PageUrl}
                              onClick={() => productlist(data.SubCatgories.PageUrl, data.PageUrl)}
                            >{data.DisplayName}</a> */}
                            <a href={`category/${data.PageUrl}/${data.SubCatgories[0].PageUrl}`}
                              onClick={() => productlist(data.SubCatgories[0].PageUrl, data.PageUrl)}
                            >{data.DisplayName}</a>
                            {console.log("category..", data.PageUrl)}
                            {data.SubCatgories.map(d =>
                              <ul>
                                <li><a href={`category/${data.PageUrl}/${d.PageUrl}`}
                                  onClick={() => productlistpage(d.PageUrl, data.PageUrl)}
                                >{d.DisplayName}</a></li>
                              </ul>
                            )}
                          </li>
                        )}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ShopBrand />
      <ToppSellingOriginal deal={nextData && nextData.dealData} /> */}
      <Footer />
    </>
  )
}
