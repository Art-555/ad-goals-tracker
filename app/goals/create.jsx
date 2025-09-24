import { useState } from 'react'
import { StyleSheet, Text, TextInput, Pressable, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGoals } from '../../hooks/useGoals'
import { useRouter } from 'expo-router'

const Create = () => {
  const [goal, setGoal] = useState('')
  const { createGoal, useMockData } = useGoals();
  const router = useRouter

  const handleSubmit = async () => {
    if (goal.trim()) {
      try {
        await createGoal({ title: goal, completed: false });
        console.log("Goal added successfully");
        setGoal('')
        Keyboard.dismiss()
        router.push('/goals')
      } catch (error) {
        console.error("Error adding goal:", error);
        // Show error message to user
        alert("Error adding goal. Please try again.");
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create a New Goal</Text>

      <TextInput
        style={styles.input}
        placeholder="What do you want to do?"
        value={goal}
        onChangeText={setGoal}
      />

      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={{color: 'white'}}>Add New Goal</Text>
      </Pressable>
      {useMockData && (
        <Text style={styles.mockDataText}>Using mock data for testing</Text>
      )}
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  input: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginVertical: 40,
  },
  button: {
    padding: 18,
    backgroundColor: '#21cc8d',
    color: 'white',
    borderRadius: 8,
  },
  mockDataText: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  }
})

