import React, { useEffect, useState } from 'react';
import { 
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    Image
} from 'react-native';

const Detalles = ({route}) => {

    const [detalle,setDetalle] = useState()

    const {url} = route.params

    useEffect(()=>{
        fetchPokemonDetalles(url)
        .then(detalle => setDetalle(detalle)) 
      },[])

      const fetchPokemonDetalles = async (url) =>{
        const response = await fetch(url)
        const json = await response.json()
        return json
      }
      

    return detalle?.name ? (
        <View>
            <View style={style.tituloMain}>
                <Text>{detalle.name}</Text>
            </View>
            <Image
                style={style.imagen}
                source={{uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${detalle.name}.png`}} 
            />
            <View style={style.containerMain}>
                <View style={style.infoLeft}>
                    <Text style={style.pokeInfo}><Text style={style.infoText}>Tipo: </Text>{detalle.types[0].type.name} {/* {detalle.types[1].type.name} */} </Text>
                    <Text style={style.pokeInfo}><Text style={style.infoText}>Altura: </Text> {detalle.height} </Text>
                    <Text><Text style={style.infoText}>Peso:</Text> {detalle.weight} </Text>
                </View>
                <View style={style.infoRight}>
                    <Text style={style.pokeInfo}><Text style={style.infoText}>Defensa:</Text> {detalle.stats[2].base_stat} </Text>
                    <Text style={style.pokeInfo}><Text style={style.infoText}>Ataque Basico: </Text> {detalle.stats[1].base_stat} </Text>
                    <Text style={style.pokeInfo}><Text style={style.infoText}>Pokedex ID:</Text> {detalle.id} </Text>
                </View>
            </View>
        </View>


    ): (
        <View style={style.error}>
          <ActivityIndicator size="large" color="#E63F34" />
        </View>
      );
}

const style = StyleSheet.create({

    tituloMain:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F84F4F',
        padding:20,
    },

    imagen:{
        width: 200,
        height: 200,
        borderWidth:1,
        borderRadius: 20, 
        borderColor: '#28262C',
    },

    containerMain:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    },

    infoLeft:{
        width: '50%',
        padding: 20,
        gap: 20,
    },

    infoRight:{
        width: '50%',
        gap: 20,
        padding: 20,
    },

    infoText:{
        color:'#F84F4F',
        fontSize:17,
    },

    pokeInfo:{
        fontSize:17,
    },

    error: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
})

export default Detalles;