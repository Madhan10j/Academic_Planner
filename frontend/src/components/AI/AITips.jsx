import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAITips } from '../../store/slices/aiSlice';

const AITips = () => {
  const dispatch = useDispatch();
  const { tips, loading } = useSelector(state => state.ai);

  useEffect(() => {
    dispatch(fetchAITips());
  }, [dispatch]);

  if (loading) {
    return <div className="ai-tips-loading">Getting personalized tips...</div>;
  }

  return (
    <div className="ai-tips">
      <h3>🤖 AI Study Tips</h3>
      <div className="tips-container">
        {tips.map((tip, index) => (
          <div key={index} className="tip-card">
            <div className="tip-icon">💡</div>
            <p>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AITips; 