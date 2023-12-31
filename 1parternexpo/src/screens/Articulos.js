import { useState, useEffect } from "react";
import { TouchableOpacity, SafeAreaView, Image, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/Card';
import { getFirestore, getDocs, collection } from "firebase/firestore/lite";
import { appArt } from '../../FirebaseConfig.js';

const Articulos = ({navigation}) => {
    const [articulos, setArticulos] = useState([]);

    const obtenerArticulos = async () => {
        const db = getFirestore(appArt);
        const query = await getDocs(collection(db, "Articulos"));
        const art = query.docs.map(doc => ({
            uid: doc.data().uid,
            Titulo: doc.data().Titulo,
            Imagen: doc.data().Imagen
        }));
        setArticulos(art);
    }

    useEffect(() => {
        obtenerArticulos();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}><Image style={styles.logo} source={require('../../assets/logoNombre.png')}/></TouchableOpacity>
            <ScrollView style={styles.articulos}>
                {articulos.map(art => <Card key={art.uid} navigation={navigation} uid={art.uid} foto={art.Imagen} titulo={art.Titulo}></Card>)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    logo: {
        height: '50%',
        resizeMode: 'contain'
    },
    articulos: {
        marginTop: '-40%',
        width: '100%'
    }
});

export default Articulos;