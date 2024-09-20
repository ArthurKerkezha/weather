import { imagesInstance } from "../api";
import { IMAGE_URL } from "../constants";

class ImagesService {
  async getPlaceImage(query) {
    const body = JSON.stringify({
      q: query,
    });

    const { data } = await imagesInstance.post(IMAGE_URL, body);

    return data.images;
  }
}
const imagesService = new ImagesService();

export default imagesService;
