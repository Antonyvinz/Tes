import React from "react";
import { AxiosResponse } from "axios";
import { Button, Card, Col, Input, Row, Form } from "antd";
import './Login.css';
import { Formik } from "formik";
import * as yup from "yup";

interface LoginPropos {
    setToken: (x: any) => any;
}
interface LoginState { }

class Login extends React.Component<LoginPropos, LoginState>{
    state = {}

    render() {
        return (
            <>
                <div className="LoginPage">
                    <h2>KerjaApp</h2>
                    <Row>
                        <Col span={12}>
                            <h1>Bekerja Lebih Efisien!</h1>
                            <p>Gabung dan temukan pekerjaan impian Anda</p>
                        </Col>
                        <Col span={12}>
                            <Card style={{ borderRadius: '20px', width: '400px' }}>
                                <Row>
                                    <Col>
                                        <h2>Masuk</h2>
                                        Email/ Username
                                        <Input placeholder="Sheilayuli@kerjaapp.com" />
                                        Kata Sandi
                                        <Input type="password" placeholder="Masukkan kata sandi Anda" />
                                        <Button type="primary">Masuk</Button>
                                    </Col>
                                </Row>

                                {/* <Form layout="vertical">
                                    <Formik
                                        initialValues={{ username: "", password: "" }}
                                        validationSchema={yup.object().shape({
                                            username: yup.string().required("Username/ Email Salah"),
                                            password: yup.string().required("Password Salah"),
                                        })}
                                        onSubmit={(values) => {
                                            postLogin(values)
                                                .then((res: AxiosResponse<any>) => {
                                                    this.props.setToken(res.data);
                                                    window.location.hash="/MyLearning";
                                                })
                                                .catch((error: any)=>{
                                                    console.log(error);
                                                })
                                                .finally(()=> {});
                                        }}
                                    >
                                        {({ handleSubmit,values, errors, touched, handleChange, setFieldValue })}
                                </Formik>
                            </Form> */}
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Login;