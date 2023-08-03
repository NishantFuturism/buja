/* eslint-disable indent */
/**
 *
 * Category
 *
 */
import React from 'react';
import { Link } from 'react-router-dom';
import CustomsAPI from '../../containers/MainPage/api/homeServices';
// import styled from 'styled-components';
// const AppWrapper = styled.div`
//   max-width: 100%;
//   margin: 0 auto;
//   display: flex;
//   min-height: 100%;
//   // padding: 0 16px;
//   flex-direction: column;
// `;
class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
    };
  }
  componentDidMount() {
    CustomsAPI.getShopbycategory({})
      .then(response => {
        this.setState({ category: response });
      })
  }
  render() {
    return (
      <div>
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
                <h2 style={{ fontSize: '1.6em' }}>Shop by Category</h2>
              </div>
            </div>
          </div>
        </section>
        <section className="categoryholder">
          <div className="container-fluid pt-20 pb-20">
            {this.state.category.map(res1 => (
              <div>
                <h3>{res1.ParentCategoryId === 0 && res1.SectionName}</h3>
                {res1.ParentCategoryId === 0 && (
                  <div className="row catbox">
                    {this.state.category.map(
                      res =>
                        (res.ParentCategoryId === res1.CategoryId && (
                          <div className="col-lg-2 col-sm-6 col-xs-6 col-6">
                            <div>
                              <Link to={res.PageUrl}>
                                <img referrerPolicy='no-referrer'
                                  src={res.CategoryImage}
                                  alt={res.ImageAlt}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'red',
                                  }}
                                />
                                {/* <img  referrerPolicy='no-referrer' src="" alt="Daily Fresh Vegetables" /> */}
                                <span>{res.DisplayName}</span>
                              </Link>
                            </div>
                          </div>
                        )) ||
                        (res.ParentCategoryId === 0 &&
                          res.CategoryMasterId === res1.CategoryId && (
                            <div className="col-lg-2 col-sm-6 col-xs-6 col-6">
                              <div>
                                <Link to={res.PageUrl}>
                                  <img referrerPolicy='no-referrer'
                                    src={res.CategoryImage}
                                    alt={res.ImageAlt}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      backgroundColor: 'red',
                                    }}
                                  />
                                  {/* <img  referrerPolicy='no-referrer' src="" alt="Daily Fresh Vegetables" /> */}
                                  <span>{res.DisplayName}</span>
                                </Link>
                              </div>
                            </div>
                          )),
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
}
Category.propTypes = {};
export default Category;
