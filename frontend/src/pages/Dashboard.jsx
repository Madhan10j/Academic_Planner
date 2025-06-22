import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../store/slices/taskSlice';
import { fetchAITips } from '../store/slices/aiSlice';
import StatsCards from '../components/Dashboard/StatsCards';
import AITips from '../components/AI/AITips';
import RecentTasks from '../components/Tasks/RecentTasks';
import UpcomingDeadlines from '../components/Dashboard/UpcomingDeadlines';
import StudyProgress from '../components/Dashboard/StudyProgress';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchAITips());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <StatsCards />

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <AITips />
          <RecentTasks />
        </div>
        
        <div className="dashboard-sidebar">
          <UpcomingDeadlines />
          <StudyProgress />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 