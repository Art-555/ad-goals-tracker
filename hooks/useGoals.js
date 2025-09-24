// hooks/useGoals.js
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import app from "../firebaseConfig"; // adjust the path if needed
import { mockGoals, generateId } from "../utils/mockData";

const db = getFirestore(app);

export function useGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      try {
        console.log("Fetching goals from Firestore...");
        const goalsCol = collection(db, "goals");
        const goalsSnapshot = await getDocs(goalsCol);
        const goalsList = goalsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched goals:", goalsList);
        setGoals(goalsList);
        setUseMockData(false);
      } catch (error) {
        console.error("Error fetching goals from Firestore:", error);
        console.log("Falling back to mock data...");
        setGoals(mockGoals);
        setUseMockData(true);
      }
      setLoading(false);
    };

    fetchGoals();
  }, []);

  const addGoal = async (goal) => {
    try {
      if (useMockData) {
        const newGoal = { id: generateId(), ...goal };
        setGoals(prev => [...prev, newGoal]);
        console.log("Added goal with mock data:", newGoal);
      } else {
        const docRef = await addDoc(collection(db, "goals"), goal);
        setGoals(prev => [...prev, { id: docRef.id, ...goal }]);
        console.log("Added goal to Firestore:", { id: docRef.id, ...goal });
      }
    } catch (error) {
      console.error("Error adding goal:", error);
      throw error;
    }
  };

  const deleteGoal = async (id) => {
    try {
      if (useMockData) {
        setGoals(prev => prev.filter(goal => goal.id !== id));
        console.log("Deleted goal with mock data:", id);
      } else {
        await deleteDoc(doc(db, "goals", id));
        setGoals(prev => prev.filter(goal => goal.id !== id));
        console.log("Deleted goal from Firestore:", id);
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
      throw error;
    }
  };

  const updateGoal = async (id, updatedGoal) => {
    try {
      if (useMockData) {
        setGoals(prev => prev.map(goal => goal.id === id ? { ...goal, ...updatedGoal } : goal));
        console.log("Updated goal with mock data:", id, updatedGoal);
      } else {
        await updateDoc(doc(db, "goals", id), updatedGoal);
        setGoals(prev => prev.map(goal => goal.id === id ? { ...goal, ...updatedGoal } : goal));
        console.log("Updated goal in Firestore:", id, updatedGoal);
      }
    } catch (error) {
      console.error("Error updating goal:", error);
      throw error;
    }
  };

  return { goals, loading, createGoal: addGoal, deleteGoal, updateGoal, useMockData };
}
