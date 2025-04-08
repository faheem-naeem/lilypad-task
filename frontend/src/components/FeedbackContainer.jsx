import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';

const FeedbackContainer = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddFeedback = () => setShowForm(true);
  const handleBackToList = () => setShowForm(false);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      {showForm ? (
        <FeedbackForm onBack={handleBackToList} onSuccess={handleBackToList} />
      ) : (
        <FeedbackList onAddNew={handleAddFeedback} />
      )}
    </div>
  );
};

export default FeedbackContainer;
