import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  TextInput,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
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
  const [idadeUnidade, setIdadeUnidade] = useState('');
  const { newPost } = usePostsStore();

  const unidades = ['dia(s)', 'mês(es)', 'ano(s)'];
  const especies = ['Cachorro', 'Gato', 'Outros'];
  const sexos = ['Macho', 'Fêmea'];
  const tipoPosts = ['Padrão', 'Adoção', 'Perdido'];

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

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos da sua permissão para usar a câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    if (
      !image ||
      !titulo ||
      !descricao ||
      !tipoPost ||
      !especie ||
      !sexo ||
      !raca ||
      !idade ||
      !idadeUnidade
    ) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione uma imagem.');
      return;
    }

    const idadeFormatada = `${idade} ${idadeUnidade}`;

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
    formData.append('idade', idadeFormatada);

    await newPost(formData);
  };

  const ModernButton = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  const OptionGroup = ({ label, options, selected, onSelect }) => (
    <View style={styles.optionGroup}>
      <Text style={styles.optionLabel}>{label}</Text>
      <View style={styles.optionRow}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.unidadeButton, selected === option && styles.unidadeButtonSelected]}
            onPress={() => onSelect(option)}>
            <Text style={[styles.unidadeText, selected === option && styles.unidadeTextSelected]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nova Postagem</Text>

        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.iconButtonHalf} onPress={pickImage}>
              <Feather name="image" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.iconButtonText}>Selecionar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtonHalf} onPress={takePhoto}>
              <Ionicons name="camera" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.iconButtonText}>Câmera</Text>
            </TouchableOpacity>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <TextInput style={styles.input} placeholder="Raça" value={raca} onChangeText={setRaca} />

        <View style={styles.idadeInline}>
          <TextInput
            style={styles.inputIdade}
            placeholder="Idade"
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
          />
          <View style={styles.unidadeGroupInline}>
            {unidades.map((unidade) => (
              <TouchableOpacity
                key={unidade}
                style={[
                  styles.unidadeButton,
                  idadeUnidade === unidade && styles.unidadeButtonSelected,
                ]}
                onPress={() => setIdadeUnidade(unidade)}>
                <Text
                  style={[
                    styles.unidadeText,
                    idadeUnidade === unidade && styles.unidadeTextSelected,
                  ]}>
                  {unidade}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <OptionGroup label="Espécie" options={especies} selected={especie} onSelect={setEspecie} />
        <OptionGroup label="Sexo" options={sexos} selected={sexo} onSelect={setSexo} />
        <OptionGroup
          label="Tipo de Post"
          options={tipoPosts}
          selected={tipoPost}
          onSelect={setTipoPost}
        />

        <ModernButton title="Postar Agora" onPress={handlePost} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  content: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  iconButtonHalf: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  icon: {
    marginRight: 8,
  },
  iconButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  idadeInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  inputIdade: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
    marginRight: 10,
    width: 110,
  },
  unidadeGroupInline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  unidadeButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 6,
    marginBottom: 5,
  },
  unidadeButtonSelected: {
    backgroundColor: '#1e90ff',
  },
  unidadeText: {
    color: '#333',
    fontWeight: '500',
  },
  unidadeTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  optionGroup: {
    marginBottom: 15,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
