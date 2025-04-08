import React from 'react';
import { Form, Input, Button, Rate, Typography, Alert } from 'antd';
import { submitFeedback } from '../services/feedbackService';

const { TextArea } = Input;
const { Title } = Typography;

const emojiMap = ['😠', '😞', '😐', '🙂', '😍'];

const FeedbackForm = ({ onBack, onSuccess }) => {
  const [form] = Form.useForm();
  const [error, setError] = React.useState('');

  const handleSubmit = async (values) => {
    try {
      await submitFeedback({
        customer_name: values.customer_name,
        rating: values.rating,
        message: values.message,
      });
      form.resetFields();
      onSuccess();
    } catch (err) {
      setError('Failed to submit. Try again.');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <Title level={3}>Add Feedback</Title>

      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Customer Name"
          name="customer_name"
          rules={[{ required: true, message: 'Please enter your customer name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: 'Please select a rating' }]}
        >
          <Rate character={({ index }) => emojiMap[index]} />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: 'Please enter your message' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item style={{ display: 'flex', gap: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={onBack}>Back</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FeedbackForm;
