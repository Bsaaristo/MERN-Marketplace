import { useState, useEffect } from 'react';
import { Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import SimpleSider from '../components/Siders/SimpleSider';
import { getSpecific, editProduct } from '../services/productData';

import '../components/Edit/Edit.css'

function Edit({ match, history }) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const productId = match.params.id;

    useEffect(() => {
        window.scrollTo(0, 0);
        getSpecific(productId)
            .then(res => setProduct(res))
            .catch(err => console.log(err));
    }, [productId])

    const onChangeHandler = (e) => {
        e.preventDefault();
        setProduct({ ...product, [e.target.name]: e.target.value });
        if (e.target.files) {
            setProduct({ ...product, image: e.target.files[0] })
        }
    }

    const onSubmitHandler = (e) => {
        //TODO: Rewrite this 
        e.preventDefault();
        let { _id, title, price, description, address, city, category, image } = product;
        let obj = { title, price, description, address, city, category }
        setLoading(true);
        if (typeof image == 'object') {
            getBase64(image)
                .then((data) => {
                    obj['image'] = data;
                    editProduct(_id, obj)
                        .then(res => {
                            if (!res.error) {
                                history.push(`/categories/${category}/${_id}/details`)
                            } else {
                                setLoading(false);
                                setError(res.error);
                                setAlertShow(true);
                            }
                        })
                        .catch(err => console.error('edit product err: ', err))
                })
                .catch(err => console.log('base64 error: ', err));
        } else {
            editProduct(_id, obj)
                .then(res => {
                    if (!res.error) {
                        history.push(`/categories/${category}/${_id}/details`)
                    } else {
                        setLoading(false);
                        setError(res.error);
                        setAlertShow(true);
                    }
                })
                .catch(err => console.error('edit product err: ', err))
        }
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    return (
        <>
          <SimpleSider />
          <div className="container">
            <h1 className="heading">Add a Product</h1>
            <Form onSubmit={this.onSubmitHandler}>
              {this.state.alertShow && (
                <Alert
                  variant="danger"
                  onClose={() => this.setState({ alertShow: false })}
                  dismissible
                >
                  <p>{this.state.errors}</p>
                </Alert>
              )}
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    required
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="state"
                    placeholder="Enter State"
                    name="state"
                    required
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
              </Form.Row>
  
              <Form.Group controlId="formGridDescription.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  required
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="Address"
                  placeholder="Enter Address"
                  name="address"
                  required
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
  
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    placeholder="Enter City"
                    required
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    name="category"
                    required
                    onChange={this.onChangeHandler}
                  >
                    <option>Choose...</option>
                    <option>microgreens</option>
                    <option>farm</option>
                    <option>home</option>
                    <option>garden</option>
                  </Form.Control>
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    name="image"
                    type="file"
                    required
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
              </Form.Row>
              {this.state.loading ? (
                <Button className="col-lg-12" variant="dark" disabled>
                  Please wait... <Spinner animation="border" />
                </Button>
              ) : (
                <Button className="col-lg-12" variant="dark" type="submit">
                  Add product
                </Button>
              )}
            </Form>
          </div>
        </>
      );
}

export default Edit;