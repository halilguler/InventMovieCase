export const movieTypeStringReplace = (type) => {
  if (type === "movie") {
    return "Film";
  } else if (type === "series") {
    return "Dizi";
  } else if(type==="episode") {
    return "Dizi Bölümleri";
  }
};
