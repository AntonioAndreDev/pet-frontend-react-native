import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function NewComment() {
  const [comment, setComment] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        className="mr-2 flex-1 rounded-lg border border-gray-300 px-4 py-2 text-base"
        placeholder="Escreva um comentário..."
        multiline
        returnKeyType="send"
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity>
        <Feather
          className="rounded-2xl bg-yellow-600 px-4 py-1.5"
          name="arrow-up-circle"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
});
