import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const PokemonList = ({ onSelectPokemon }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erro ao buscar os Pokémons');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const id = item.url.split('/').filter(Boolean).pop();
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <TouchableOpacity onPress={() => onSelectPokemon(item.name)}>
              <View style={styles.card}>
                <Image source={{ uri: image }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const PokemonDetails = ({ pokemonName, onGoBack }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erro ao buscar os detalhes do Pokémon');
        setLoading(false);
      });
  }, [pokemonName]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {pokemon && (
        <View style={styles.detailCard}>
          <Image source={{ uri: pokemon.sprites.front_default }} style={styles.detailImage} />
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.info}>ID: {pokemon.id}</Text>
          <Text style={styles.info}>Tipo(s): {pokemon.types.map(t => t.type.name).join(', ')}</Text>
          <Text style={styles.info}>Peso: {pokemon.weight} kg</Text>
          <Text style={styles.info}>Altura: {pokemon.height} m</Text>
          <Text style={styles.info}>
            Habilidades: {pokemon.abilities.map(a => a.ability.name).join(', ')}
          </Text>
        </View>
      )}
      <TouchableOpacity onPress={onGoBack} style={styles.goBackButton}>
        <Text style={styles.goBackText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <View style={styles.container}>
      {selectedPokemon ? (
        <PokemonDetails pokemonName={selectedPokemon} onGoBack={() => setSelectedPokemon(null)} />
      ) : (
        <PokemonList onSelectPokemon={(name) => setSelectedPokemon(name)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  detailCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  detailImage: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
    textTransform: 'capitalize',
  },
  goBackButton: {
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  goBackText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
