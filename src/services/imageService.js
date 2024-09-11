import axios from "axios";
import { IMAGE_API_URL } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.REACT_APP_SERPER_PLACES_API,
  },
};

class ImagesService {
  async getPlaceImage(query) {
    const body = JSON.stringify({
      q: query,
    });

    const { data } = await axios.post(IMAGE_API_URL, body, config);

    console.log(data);
    return data.images;
  }
}
const imagesService = new ImagesService();

export default imagesService;
