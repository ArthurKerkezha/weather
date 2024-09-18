export const loadImageSrc = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();

    img.src = src;
    img.onload = () => resolve(img.src);
    img.onerror = reject;
  });

export const filteredCityImages = (cityImages) => {
  const filteredImages = cityImages.filter((city) => city?.imageUrl);

  return Promise.all(filteredImages.map((city) => loadImageSrc(city.imageUrl)));
};
