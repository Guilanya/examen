import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const CreateTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleCreateTask = () => {
    if (title) {
      // Verifica que la fecha esté en el formato correcto
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;  // Regex para el formato YYYY-MM-DD
      if (deadline && !datePattern.test(deadline)) {
        alert('La fecha debe ser en formato YYYY-MM-DD');
        return;
      }

      const newTask = {
        id: Date.now().toString(),
        title,
        deadline,
        completed: false,
      };
      navigation.navigate('TaskList', { newTask });
    } else {
      alert('El título es obligatorio');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título de la tarea"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={deadline}
        onChangeText={setDeadline}
      />
      <Button title="Crear tarea" onPress={handleCreateTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 20, paddingLeft: 10 },
});

export default CreateTaskScreen;
