import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';

import { usePostsStore } from '../stores/posts/usePostsStore';

export default function NewPost() {
  const [image, setImage] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoPost, setTipoPost] = useState('');
  const [especie, setEspecie] = useState('');
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const { newPost } = usePostsStore();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos da sua permissão para acessar a galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    if (!image || !titulo || !descricao || !tipoPost || !especie || !sexo || !raca || !idade) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione uma imagem.');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: 'foto.jpg',
      type: 'image/jpeg',
    });
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('tipo_post', tipoPost);
    formData.append('especie', especie);
    formData.append('sexo', sexo);
    formData.append('raca', raca);
    formData.append('idade', idade);

    await newPost(formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nova Postagem</Text>

        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Button title="Selecionar Imagem" onPress={pickImage} />
        )}

        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo de Post"
          value={tipoPost}
          onChangeText={setTipoPost}
        />
        <TextInput
          style={styles.input}
          placeholder="Espécie"
          value={especie}
          onChangeText={setEspecie}
        />
        <TextInput style={styles.input} placeholder="Sexo" value={sexo} onChangeText={setSexo} />
        <TextInput style={styles.input} placeholder="Raça" value={raca} onChangeText={setRaca} />
        <TextInput
          style={styles.input}
          placeholder="Idade"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
        />

        <Button title="Postar Agora" onPress={handlePost} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
});
