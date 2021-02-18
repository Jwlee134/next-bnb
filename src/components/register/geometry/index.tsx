import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import throttle from "lodash/throttle";
import { registerRoomActions } from "src/store/registerRoom";
import { useSelector } from "src/store";
import RegisterRoomFooter from "../RegisterRoomFooter";

const RegisterRoomBody = styled.div``;

const MapContainer = styled.div`
  width: 487px;
  height: 300px;
  margin-bottom: 24px;
  #map {
    width: 100%;
    height: 100%;
    .gm-style-mtc {
      display: none; // 지도/위성 탭
    }
    .gm-svpc {
      display: none; // 스트리트 뷰 아이콘
    }
    .gm-fullscreen-control {
      display: none; // 풀스크린 버튼
    }
    .locationButton {
      background-color: white;
      border: none;
      outline: none;
      box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
      padding: 10px;
      cursor: pointer;
      border-radius: 2px;
      margin-top: -10px;
      margin-right: 10px;
    }
  }
`;

declare global {
  interface Window {
    initMap: () => void;
  }
}

const RegisterGeometry = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { latitude, longitude } = useSelector((state) => state.registerRoom);
  const dispatch = useDispatch();

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

      const marker = new google.maps.Marker({
        position: {
          lat: latitude || 37.5667,
          lng: longitude || 126.9784,
        },
        map,
      });

      map.addListener(
        "center_changed",
        throttle(() => {
          const lat = map.getCenter().lat();
          const lng = map.getCenter().lng();
          marker.setPosition({ lat, lng });
          dispatch(registerRoomActions.setLatitude(lat));
          dispatch(registerRoomActions.setLongitude(lng));
        }, 100)
      );

      // 사용자 현재 위치로 좌표 가져오기
      // https://developers.google.com/maps/documentation/javascript/geolocation
      const locationButton = document.createElement("button");
      locationButton.textContent = "현재 위치 사용";
      locationButton.classList.add("locationButton");

      map.controls[google.maps.ControlPosition.RIGHT_TOP].push(locationButton);

      locationButton.addEventListener("click", () => {
        locationButton.textContent = "불러오는 중...";
        navigator.geolocation.getCurrentPosition(
          ({ coords }: { coords: { latitude: number; longitude: number } }) => {
            const { latitude: lat, longitude: lng } = coords;
            map.setCenter({ lat, lng });
            map.setZoom(17);
            locationButton.textContent = "현재 위치 사용";
          },
          (e) => {
            console.log(e);
            alert("위치 정보를 불러오는 데 실패하였습니다.");
          }
        );
      });
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <>
      <RegisterRoomBody>
        <h2>핀이 놓인 위치가 정확한가요?</h2>
        <h3>4단계</h3>
        <p>필요한 경우 핀이 정확한 위치에 자리하도록 조정할 수 있어요.</p>
        <MapContainer>
          <div ref={mapRef} id="map" />
        </MapContainer>
      </RegisterRoomBody>
      <RegisterRoomFooter isValid={true} nextHref="/room/register/amentities" />
    </>
  );
};

export default RegisterGeometry;
