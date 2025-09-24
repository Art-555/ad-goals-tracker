// utils/mockData.js
export const mockGoals = [
  { id: '1', title: 'Complete React Native tutorial', completed: false },
  { id: '2', title: 'Build a goals app', completed: true },
  { id: '3', title: 'Learn Firebase', completed: false },
];

export const generateId = () => Math.random().toString(36).substr(2, 9);
