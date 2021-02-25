import React, { useEffect, useRef } from "react";
import { useSelector } from "src/store";
import styled from "styled-components";

const Container = styled.div`
  width: calc(100% - 840px);
  height: calc(100vh - 80px);
  position: fixed;
  top: 80px;
  right: 0;
  > div {
    width: 100%;
    height: 100%;
  }
  .gmnoprint .gm-style-mtc {
    display: none;
  }
  .gm-svpc {
    display: none;
  }
  .gm-fullscreen-control {
    display: none;
  }
  .gm-bundled-control {
    top: -40px;
    right: 55px !important;
  }
  .gmnoprint > div {
    border-radius: 8px !important;
    overflow: hidden;
  }
`;

const Button = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  top: 40px;
  left: 40px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: white;
  box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.08);
  background-image: url("/static/svg/map/google_close.svg");
  background-repeat: no-repeat;
  background-position: center;
`;

declare global {
  interface Window {
    initMap: () => void;
  }
}

interface Props {
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomListMap = ({ showMap, setShowMap }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { latitude, longitude } = useSelector((state) => state.searchRoom);
  const { rooms } = useSelector((state) => state.room);

  const loadMap = () => {
    // https://developers.google.com/maps/documentation/javascript/overview
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
  };

  window.initMap = () => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: latitude || 37.5667, lng: longitude || 126.9784 },
        zoom: 15,
      });
      rooms.forEach((room) => {
        const marker = new google.maps.Marker({
          position: { lat: room.latitude, lng: room.longitude },
          map,
        });
        marker.addListener("click", () => {
          console.log(room.id);
        });
      });
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <Container>
      <div ref={mapRef} id="map" />
      <Button onClick={() => setShowMap(false)} />
    </Container>
  );
};

export default RoomListMap;
