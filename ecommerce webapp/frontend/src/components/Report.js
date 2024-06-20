import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../css/report.css"

const Report = () => {
    const [products, setProducts] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {
        try{
            axiosPrivate('/api/admin/report', { 
                method : 'GET',
            })
                .then(res => {
                    console.log(res)
                    setProducts(res.data)
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
        
    }, [])

    return (
        
      <div className = "report">
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
      <title>Report</title>
      <meta name="author" content="Codeconvey" />
      <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap" rel="stylesheet" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" />
      {/*Only for demo purpose - no need to add.*/}
      {/* <link rel="stylesheet" href="css/demo.css" /> */}
      <link rel="stylesheet" href="report.css" />
      <div className="ScriptTop">
      </div>
      <section>
        <div className="rt-container">
          <div className="col-rt-12">
            <div className="Scriptcontent">
              {/* Student Profile */}
              <div className="student-profile py-4 m-5 ">
                <div className="container">
                  <div className="row">
                    <div className="col ml-5">
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent border-0">
                          <h3 className="mb-0 py-2 pl-2">REPORT</h3>
                        </div>
                        <div className="card-body pt-0">
                          <div>
                          </div><table className="table table-bordered">
                            <tbody><tr>
                                <th width="30%">PRODUCT</th>
                                <td width="2%" />
                                <th width="30%">QUANTITY SOLD</th>
                              </tr>
                              {
                                products.map(product => 
                                <tr key = {product.productName}>
                                <th width="30%">{product.productName}</th>
                                <td width="2%">:</td>
                                <td> {product.quantity} </td>
                              </tr>)
                              }
                            </tbody>
                            </table>
                        </div>
                      </div>
                      <div style={{height: '26px'}} />
                    </div>
                  </div>
                </div>
              </div>
              {/* partial */}
            </div>
          </div>
        </div>
      </section>
      {/* Analytics */}
    </div>
  
    )
}

export default Report;