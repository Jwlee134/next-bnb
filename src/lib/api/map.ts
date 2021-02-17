import axios from "src/pages/api";

export const getLocationInfoAPI = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) =>
  axios.get(`api/maps/location?latitude=${latitude}&longitude=${longitude}`);