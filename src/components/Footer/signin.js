import React from 'react';
//import { Link, useHistory } from 'react-router-dom';
import { useRouter } from 'next/router';
import Link from 'next/link';
function SignIn() {
  //const history = useHistory()
  const router = useRouter();

  const Signinnow = () => {
    router.push({ pathname: '/login' })
  }
  const createNewcustomer = () => {
    // alert('createAnAccount btn clicked')
    router.push({ pathname: '/register', rediractFrom: '/signin' })
  }
  return (
    <>
      <signin>
        <section className="contact-style-2" style={{ marginTop: '2px' }}>
          <div className="container-fluid signinsection">
            <div className="row">
              <div className="col-12">
                <div className="contact2-title text-center">
                  <p><b>See personalized recommendations</b></p>
                </div>
                <div className="login-box text-center" >
                  <button type="button"
                    id="btnsignin"
                    className="btn btn-secondary mb-2 mt-2 "
                    onClick={Signinnow}
                    style={{ backgroundColor: '#000000', color: '#ffffff', width: '20%' }}>
                    Sign in
                  </button>
                </div>
                <div className="text-center top-bordered " style={{ borderTop: 'none' }}>
                  <p>
                    <b>New customer?&nbsp;
                      {
                        // eslint-disable-next-line anchor-is-valid
                      }
                      <Link
                        href="#"
                        onClick={createNewcustomer}
                        className='createsign' id="newcust" style={{ color: 'dodgerblue' }}>
                        Start here.
                      </Link>
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </signin>
    </>
  )
}
export default SignIn;