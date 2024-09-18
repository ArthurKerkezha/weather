import { imagesInstance } from "../api";

class ImagesService {
  async getPlaceImage(query) {
    const body = JSON.stringify({
      q: query,
    });

    const { data } = await imagesInstance.post("images", body);

    return data.images;
  }
}
const imagesService = new ImagesService();

export default imagesService;
