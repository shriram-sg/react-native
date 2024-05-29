import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TextInput, View, Image } from "react-native";
import { filterConfig } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon";

export default function Index() {

  let [data, setData] = useState([])
  let [search, setSearch] = useState("")
  let [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("HERE")
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        //TODO: Move to env file
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzI1NWQ5ZTI0YmQxYTEwMTRhOWI1OWE5OGM4YzViZCIsInN1YiI6IjY2NTYyZmI5MzM2ZmNjOTVmNGE4OGJmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HF46QlFDFuZoHoKZ72k9xbWHAuU_m4t56yAHIWTjIz0'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setData(json.results)
        setIsLoading(false)
      })
      .catch(err => console.error('error:' + err));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        style={{ height: 40 }}
        placeholder="Search Movie"
        value={search}
        onChangeText={newText => {
          setSearch(newText)
          console.log(data)
          console.log(data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())))
        }}
      //defaultValue={}
      />
      <FlatList
        ListEmptyComponent={() => {
          if (isLoading) {
            return <ActivityIndicator />
          }
        }}
        data={data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))}
        extraData={data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))}
        renderItem={({ item }) => {
          return <>
            <Image
              source={{
                uri: "https://reactnative.dev/img/tiny_logo.png"
              }} />
            <Text>{item.title}</Text>
          </>
        }}
      />

    </View>
  );
}
