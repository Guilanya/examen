import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';

const TaskListScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([
    { id: Date.now().toString(), title: 'Comprar pan', deadline: '2024-11-21', completed: false },
    { id: (Date.now() + 1).toString(), title: 'Estudiar React Native', deadline: '', completed: false },
  ]);

  useEffect(() => {
    if (route.params?.newTask) {
      setTasks(prevTasks => [...prevTasks, route.params.newTask]);
    }

    if (route.params?.updatedTask) {
      setTasks(prevTasks =>
        prevTasks.map((task) =>
          task.id === route.params.updatedTask.id ? route.params.updatedTask : task
        )
      );
    }
  }, [route.params?.newTask, route.params?.updatedTask]);

  const handleDelete = (taskId) => {
    Alert.alert('Eliminar tarea', '¿Estás seguro de que quieres eliminar esta tarea?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: () => setTasks(tasks.filter((task) => task.id !== taskId)),
      },
    ]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    navigation.navigate('EditTask', { task: taskToEdit });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Switch
              value={item.completed}
              onValueChange={() => toggleTaskCompletion(item.id)}
            />
            <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
              {item.deadline ? `${item.title} - ${item.deadline}` : item.title}
            </Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleEdit(item.id)}
                style={styles.editButton}
              >
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateTask')}
      >
        <Text style={styles.addButtonText}>Añadir tarea</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  task: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  taskText: { flex: 1, fontSize: 16 },
  taskCompleted: { textDecorationLine: 'line-through' },
  buttons: { flexDirection: 'row' },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButtonText: { color: 'white' },
  editButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: { color: 'black' },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  addButtonText: { color: 'white', fontSize: 16 },
});

export default TaskListScreen;
