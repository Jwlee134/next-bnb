import axios from "src/pages/api";

export const searchPlacesAPI = (keyword: string) =>
  axios.get<{ description: string; placeId: string }[]>(
    `api/maps/places?keyword=${keyword}`
  );

export const getPlaceAPI = (id: string) =>
  axios.get<{ latitude: number; longitude: number }>(`api/maps/places/${id}`);
