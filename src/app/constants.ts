export const apiBaseUrl = "http://localhost:5019";
export const imageBaseUrl = "http://localhost:5019/";
export const getImage = (uri: string) => {
  return imageBaseUrl + uri;
};
