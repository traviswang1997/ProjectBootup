import React, {useState} from 'react';
import {
    Button,
    Divider,
    Form,
    Input,
    Row,
    Col,
    DatePicker
} from 'antd';
import {useForm, Controller} from 'react-hook-form';
import './ClientForm.css'

function ClientForm() {

        const [componentSize, setComponentSize] = useState("default");
        const onFormLayoutChange = ({ size }) => {
            setComponentSize(size);
        };

        const{control, handleSubmit} = useForm();
        const onSubmit = (data) =>{
            console.log(data);
        }

        return(
            <div align="center" className='center'>
                <Divider>Clients Information</Divider>
                <Form
                    labelCol={{
                        span: 4
                    }}
                    wrapperCol={{
                        span: 8
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                    onFinish={handleSubmit(onSubmit)}
                >
                    <Form.Item label="First Name:">
                        <Controller
                            name="firstname"
                            as={<Input type='text'/>}
                            control={control}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item label="Last Name:">
                        <Controller
                            name="lastname"
                            as={<Input type='text' />}
                            control={control}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item label="Email:">
                        <Controller
                            name="email"
                            as={<Input type='email' />}
                            control={control}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item label="Contact Number:">
                        <Controller
                            name="contactNumber"
                            render={(props)=>(
                                <Input.Group size="large">
                                    <Row gutter={8}>
                                        <Col span={5}>
                                        <Input defaultValue="+61" />
                                        </Col>
                                        <Col span={8}>
                                        <Input defaultValue="04" />
                                        </Col>
                                    </Row>
                                </Input.Group>
                            )}
                            control={control}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Divider>Project Information</Divider>
                    <Form.Item label="Project Name:">
                        <Controller
                            name="projectName"
                            as={<Input type='text' />}
                            control={control}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Form.Item label="Start Date:">
                        <Controller
                            name="startdate"
                            as={<DatePicker style={{width: '100%'}}/>}
                            control={control}
                            defaultValue=""
                        />
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form>
            </div>
        );
}

export default ClientForm;