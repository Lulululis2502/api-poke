# API-JACQUES-POKE
não estava conseguindo upar o code certinho aqui ai vou pedir para voce baixar o .zip, obgggg

# 📱 App Pokédex (React Native + Expo)

Esse projeto é uma pequena Pokédex feita com **React Native** usando o **Expo**, só pra brincar com consumo de APIs REST usando a [PokeAPI](https://pokeapi.co/). Ele lista alguns Pokémons e mostra detalhes de cada um quando clicado.

## 🚀 Como rodar

1. Clone o repositório:


Instale as dependências:

npm install
Rode o app:


npm run web

📝 Relatório Técnico
Como foi feito
Usei o fetch() pra pegar os dados da PokeAPI, que é pública O app tem duas telas principais: uma que mostra a lista de Pokémons e outra que mostra os detalhes quando você clica num deles.

Usei useState, useEffect, FlatList, TouchableOpacity e ActivityIndicator pra controlar o estado, exibir os dados e mostrar um loading enquanto carrega.

Desafio

Layout responsivo: ajustar a visualização dos cards e detalhes pra funcionar bem tanto na lista quanto na página de detalhes exigiu um pouco de trabalho com o StyleSheet.

Fetch vs Axios
Nesse projeto usei apenas fetch() porque ele já é nativo no React Native e funciona muito bem pra chamadas simples.
