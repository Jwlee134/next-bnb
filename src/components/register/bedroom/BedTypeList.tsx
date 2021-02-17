import React from "react";
import styled from "styled-components";
import { useSelector } from "src/store";
import BedTypes from "./BedTypes";
import PublicBedTypes from "./PublicBedTypes";

const BedListContainer = styled.div`
  width: 548px;
`;

const BedTypeList = () => {
  const { bedroomDetail } = useSelector((state) => state.registerRoom);
  return (
    <BedListContainer>
      {bedroomDetail.map((bedroom, index) => (
        <BedTypes bedroom={bedroom} key={index} />
      ))}
      <PublicBedTypes />
    </BedListContainer>
  );
};

export default BedTypeList;
