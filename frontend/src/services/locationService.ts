//axios help frontend make http requests
import axios from "axios";

//function for location search
export async function searchLocations(query: string) {
  //this calls backend api
  const response = await axios.get(
    `http://127.0.0.1:8000/locations/search?q=${query}`,
  );

  return response.data;
}
