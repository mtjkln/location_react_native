import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";

const MapPage = () => {
    const store=useSelector(state=>state);
  return (
    <View>
      
      <MapView style={style.map}  >
        {store.latitude!=="" && <MapView.Marker
            coordinate={{latitude: parseFloat(store.latitude),
            longitude: parseFloat(store.longitude)}}
            title={"title"}
            description={"description"}
         />
      }
      </MapView>
      
    </View>
  );
};
const style = StyleSheet.create({
  map: { width: "100%", height: "100%" },
});
export default MapPage;
