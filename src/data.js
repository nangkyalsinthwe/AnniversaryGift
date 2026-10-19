const imageModules = import.meta.glob("./assets/coupleImg/*.jpg", {
  eager: true,
  import: "default",
});

const getData = Object.values(imageModules).map((img, index) => ({
  id: index + 1,
  img: img,
}));

export default getData;
