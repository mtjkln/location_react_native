import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import LocationPage from "../screens/LocationPage";
import MapPage from "../screens/MapPage";
const Mytabs=()=>{
    const Tab=createBottomTabNavigator();
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={LocationPage}/>
            <Tab.Screen name="Map" component={MapPage}/>
        </Tab.Navigator>
    )
}
export default Mytabs;