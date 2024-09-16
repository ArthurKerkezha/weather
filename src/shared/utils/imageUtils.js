export const loadImageSrc = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();

    img.src = src;
    img.onload = () => resolve(img.src);
    img.onerror = reject;
  });
