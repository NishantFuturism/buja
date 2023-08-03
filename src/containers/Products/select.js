/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { defaultAction } from './actions';
import reducer from './reducer';
import saga from './saga';
// import Select from './select';
export default function Select(props) {
  useInjectReducer({ key: 'products', reducer });
  useInjectSaga({ key: 'products', saga });
  const [filtered, setFiltered] = useState([]);
  const [Seleced, setSeleced] = useState('');
  const dispatch = useDispatch()
  console.log('pros', props);
  const changeFltr = (newFL) => {
    setSeleced(newFL);
    const P = props.data.FilterList ? props.data.FilterList.find(i => i.ListItem === newFL) : props.data.FilterList.find(i => i.ListItem === newFL)
    setFiltered(P);
    // localStorage.setItem('filtered', filtered)
    // localStorage.setItem('price', JSON.stringify(P))
    dispatch(defaultAction(P))
  };
  useEffect(() => {
    setFiltered(props.data.FilterList[0] ? props.data.FilterList[0] : props.data.FiltersList[0])
    dispatch(defaultAction(filtered))
  }, [])
  console.log('ffiltered', filtered);
  localStorage.setItem('filtered', filtered.FilterSPPrice)
  return (
    <>
      <select className="nice-select ddl-weight"
        onChange={event =>
          changeFltr(event.target.value, props.data.SkuId)
        }
        value={Seleced}
      >
        {(props && props.data.FilterList ? props.data.FilterList : props.data.FiltersList).map(itm =>
          <option>
            {itm.ListItem}
          </option>
        )}
      </select>
      <span id="spprice83839">₹ {filtered && filtered.FilterSPPrice}</span>
      {/* <h1>{filtered && filtered.FilterSPPrice}</h1> */}
    </>
  )
}
