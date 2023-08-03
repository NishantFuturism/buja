import React, { useEffect, useRef, useState } from 'react';
import LoadProducts from '../LoadProducts';
export function Orders() {
  const [postList, setPostList] = useState({
    list: []
  });
  // tracking on which page we currently are
  const [page, setPage] = useState(1);
  // add loader refrence 
  const loader = useRef(null);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, []);
  useEffect(() => {
    // here we simulate adding new posts to List
    const token = localStorage.getItem('generatedtoken');
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    fetch(`https://productionapi.adibuja.com/api/v2/skulisting?clientId=1&catUrl=home-appliances&languageId=2&CurrencyCode=INR&custGUID=bb699bbf-06f1-4a8b-b1ed-c7f3ef1c5bd5&cartGuid=ead95424-afcd-4593-a2ad-13ac31bb1a1a&fixedShippingDurationId=0&pageNo=${page}&limit=4&sortby=POP&pincode=411045&defaultListing=false`, {
      method: 'GET',
      headers,
    })
      .then(res => res.json())
      .then(registerresponse => {
        // setPostList(registerresponse.skuListingModels)
        // console.log({ postList });
        // const newList = p(postList);
        setPostList({
          list: registerresponse.skuListingModels
        })
        const newList = postList.list.concat(registerresponse.skuListingModels);
        setPostList({
          list: newList
        })
      });
  })
  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = (entities) => {
    // console.log('entities', entities[0].boundingClientRect.y);
    const target = entities[0];
    const token = localStorage.getItem('generatedtoken');
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    if (target.isIntersecting) {
      fetch(`https://productionapi.adibuja.com/api/v2/skulisting?clientId=1&catUrl=home-appliances&languageId=2&CurrencyCode=INR&custGUID=bb699bbf-06f1-4a8b-b1ed-c7f3ef1c5bd5&cartGuid=ead95424-afcd-4593-a2ad-13ac31bb1a1a&fixedShippingDurationId=0&pageNo=${page}&limit=4&sortby=POP&pincode=411045&defaultListing=false`, {
        method: 'GET',
        headers,
      })
        .then(res => res.json())
        .then(registerresponse => {
          // setPostList(registerresponse.skuListingModels)
          // console.log({ postList });
          // const newList = p(postList);
          setPostList({
            list: registerresponse.skuListingModels
          })
          const newList = postList.list.concat(registerresponse.skuListingModels);
          setPostList({
            list: newList
          })
          setPage(() => page + 1)
        });
    }
    // if (!target.isIntersecting) {
    //   console.log('upup');
    // setPage(() => page + 1)
    // fetch(`https://productionapi.adibuja.com/api/v2/skulisting?clientId=1&catUrl=daily-fresh-vegetables&languageId=2&CurrencyCode=INR&custGUID=bb699bbf-06f1-4a8b-b1ed-c7f3ef1c5bd5&cartGuid=ead95424-afcd-4593-a2ad-13ac31bb1a1a&fixedShippingDurationId=0&pageNo=${page}&limit=4&sortby=POP&pincode=411045&defaultListing=false`, {
    //   method: 'GET',
    //   headers,
    // })
    // .then(res => res.json())
    // .then(registerresponse => {
    //   console.log('registerresponse', registerresponse)
    // setPostList(registerresponse.skuListingModels)
    // console.log({ postList });
    // const newList = p(postList);
    // setPostList({
    //   list: registerresponse.skuListingModels
    // })
    // console.log({ postList });
    // const newList = postList.list.concat(registerresponse.skuListingModels);
    // setPostList({
    //   list: newList
    // })
    // });
    // }
  }
  return (<>
    <div id="products" className="shop-product-wrap row grid">
      {(postList.list || []).map((data) => (
        // <Suspense fallback={<img src={imageFile} alt='Avatar' style={{ width: '50%' }} />}>
        <div className='col-lg-3' style={{ marginBottom: 5 }}>
          <LoadProducts data={data} />
        </div>
        //  </Suspense> 
      ))}
      <div className="loading" ref={loader}>
        <h2>Load More {page}</h2>
      </div>
    </div>
  </>)
}
export default Orders;