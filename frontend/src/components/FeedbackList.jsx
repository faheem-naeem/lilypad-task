import React, { useEffect, useState } from 'react';
import { Table, Select, Button, Typography, Space } from 'antd';
import { fetchFeedbacks } from '../services/feedbackService';

const { Title } = Typography;
const { Option } = Select;

const FeedbackList = ({ onAddNew }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null);

  const getData = async () => {
    try {
      const data = await fetchFeedbacks(ratingFilter);
      setFeedbacks(data);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [ratingFilter]);

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Comment',
      dataIndex: 'message',
      key: 'message',
    },
  ];

  return (
    <div style={{ maxWidth: 900, margin: 'auto' }}>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
        align="center"
      >
        <Title level={3} style={{ margin: 0 }}>
          Feedbacks
        </Title>

        <Button type="primary" onClick={onAddNew}>
          Add New Feedback
        </Button>
      </Space>

      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>Filter by Rating:</span>
        <Select
          value={ratingFilter}
          onChange={(value) => setRatingFilter(value || null)}
          style={{ width: 160 }}
          allowClear
          placeholder="Select rating"
        >
          <Option value="">All</Option>
          <Option value="1">1 Star</Option>
          <Option value="2">2 Stars</Option>
          <Option value="3">3 Stars</Option>
          <Option value="4">4 Stars</Option>
          <Option value="5">5 Stars</Option>
        </Select>
      </div>

      <Table
        dataSource={feedbacks}
        columns={columns}
        rowKey={(record, index) => index}
        locale={{ emptyText: 'No feedback yet.' }}
        bordered
      />
    </div>
  );
};

export default FeedbackList;
