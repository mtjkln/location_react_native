import { Text, StyleSheet, View, ScrollView, Button } from "react-native";
import React, { useEffect } from "react";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { callApiSliceAction, thunkFunction } from "../store/store";

const LocationPage = () => {
  const dispacth = useDispatch();
  const store = useSelector((state) => state);

  useEffect(() => {
    setInterval(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        try {
          let place = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${location.coords.latitude}+${location.coords.longitude}&key=6ebf8a58f86147c4bb453fcc0f854787`
          );

          dispacth(
            thunkFunction({
              city: place.data.results[0].components.city,
              coords: location.coords,
            })
          );
        } catch (e) {
          console.log("error");
        }
      })();
    }, 10000);
  }, []);
  const removeItem = (item) => {
    dispacth(callApiSliceAction.removeItem(item));
  };
  const onClearAll = () => {
    dispacth(callApiSliceAction.clearAll());
  };
  return (
    <View style={style.container}>
      <Text style={style.currentLocationText}>Current Location</Text>
      <View style={style.currentLocation}>
        {store.currentStatus.currentPlace !== "" && (
          <>
            <View style={style.icon}>
              <Text style={style.iconText}>NA</Text>
            </View>
            <View style={style.locationDetails}>
              <Text style={style.location}>
                {store.currentStatus.currentPlace}
              </Text>
              <Text style={style.time}>{store.currentStatus.currentTime}</Text>
            </View>
          </>
        )}
        {store.currentStatus.currentPlace === "" && (
          <View style={style.loadingContainer}>
            <Text style={style.loading}>Loading....</Text>
          </View>
        )}
      </View>
      <View>
        {store.previousLocations.length === 0 && (
          <Text style={style.currentLocationText}>No Previous Location</Text>
        )}
        {store.previousLocations.length !== 0 && (
          <>
            <Text style={style.currentLocationText}>Previous Location</Text>
            <View style={style.previousContainer}>
              <View style={style.previous}>
                <ScrollView>
                  {store.previousLocations.map((item, index) => {
                    return (
                      <View
                        style={{
                          margin: 5,
                          display: "flex",
                          flexDirection: "row",
                        }}
                        key={index}
                      >
                        <View style={{ flex: 3 }}>
                          <Text style={{ fontSize: 25 }}>
                            {item.currentPlace}
                          </Text>
                          <Text>{item.currentTime}</Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            height: 40,
                            backgroundColor: "#ededed",
                            borderRadius: 10,
                          }}
                        >
                          <Button
                            onPress={() => {
                              removeItem(item.currentTime);
                            }}
                            color="black"
                            title="Remove"
                          />
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
                <View style={style.buttonClear}>
                  <Button
                    title="Clear All"
                    onPress={onClearAll}
                    color="white"
                  />
                </View>
                {/* {
                <FlatList
                  data={arr}
                  keyExtractor={(item,index)=>index}
                  renderItem={({ items, index }) => (
                    <View key={index}>
                      <Text>{items}</Text>
                    </View>
                  )}
                />
              } */}
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
  },
  currentLocation: {
    margin: 10,
    height: "15%",
    width: "95%",
    borderWidth: 1,
    overflow: "hidden",
    borderColor: "#ddd",
    borderRadius: 20,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  currentLocationText: {
    margin: 5,
    marginLeft: 13,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "orange",
    display: "flex",
    justifyContent: "center",
    margin: 8,
  },
  iconText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
  },
  locationDetails: {
    width: "72%",
    height: "90%",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
  },
  location: {
    fontSize: 22,
    margin: 5,
  },
  time: {
    margin: 5,
  },
  loading: {
    fontSize: 25,
    textAlign: "center",
  },
  loadingContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  previous: {
    width: "95%",
    height: "88%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  previousContainer: {
    display: "flex",
    alignItems: "center",
  },
  buttonClear: {
    position: "fixed",
    bottom: 5,
    backgroundColor: "rgba(48,85,255,1)",
    borderRadius: 10,
    margin: 10,
  },
});
export default LocationPage;
