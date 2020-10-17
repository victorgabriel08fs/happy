import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';

import mapMarker from '../images/map-marker.png';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OrphanagesMap = () => {

    const navigation = useNavigation();

    function navigateToDetails() {
        navigation.navigate('OrphanageDetails');
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: -16.7502331,
                    latitudeDelta: 0.008,
                    longitude: -43.8681855,
                    longitudeDelta: 0.008
                }}
            >
                <Marker
                    calloutAnchor={{
                        x: 2.7,
                        y: 0.8,
                    }}
                    icon={mapMarker}
                    coordinate={{
                        latitude: -16.7502331,
                        longitude: -43.8681855
                    }}
                >
                    <Callout
                        tooltip
                        onPress={navigateToDetails}
                    >
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>Lar das meninas</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>2 orfanatos encontrados</Text>

                <TouchableOpacity style={styles.createOrphanageButton} onPress={() => { }}>
                    <Feather name="plus" size={20} color='#FFF' />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 28,
    },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 16,
        justifyContent: 'center',
    },

    calloutText: {
        color: '#0089a5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3,
    },

    footerText: {
        color: '#8FA7B3',
        fontFamily: 'Nunito_700Bold',
    },

    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15C3D6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default OrphanagesMap;