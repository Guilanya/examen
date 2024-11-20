import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;

  // Verifica si 'task' existe, de lo contrario, inicializa valores vacíos
  const [title, setTitle] = useState(task ? task.title : '');
  const [deadline, setDeadline] = useState(task ? task.deadline : '');

  const handleSave = () => {
    if (title.trim() === '') {
      alert('El título es obligatorio');
      return;
    }

    // Verifica que la fecha esté en el formato correcto
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;  // Regex para el formato YYYY-MM-DD
    if (deadline && !datePattern.test(deadline)) {
      alert('La fecha debe ser en formato YYYY-MM-DD');
      return;
    }

    const updatedTask = { ...task, title, deadline };
    navigation.navigate('TaskList', { updatedTask });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Editar Tarea</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título de la tarea"
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={deadline}
        onChangeText={setDeadline}
      />
      {/* Asegúrate de que no haya texto suelto fuera del componente <Text> */}
      <View style={styles.buttonContainer}>
        <Button title="Guardar cambios" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, fontSize: 16 },
  buttonContainer: { marginTop: 20 },
});

export default EditTaskScreen;
