/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Button, Icon, Text, View } from "@aws-amplify/ui-react";
export default function Leaderboard(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="902px"
      height="708px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Leaderboard")}
      {...rest}
    >
      <View
        width="828px"
        height="578px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="106px"
        left="40px"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        borderRadius="25px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(34,34,34,1)"
        {...getOverrideProps(overrides, "Frame 467")}
      >
        <Text
          fontFamily="Inter"
          fontSize="20px"
          fontWeight="400"
          color="rgba(255,255,255,1)"
          lineHeight="24.204544067382812px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="94px"
          height="32px"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="35px"
          left="38px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Rank"
          {...getOverrideProps(overrides, "Rank")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="20px"
          fontWeight="400"
          color="rgba(255,255,255,1)"
          lineHeight="24.204544067382812px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="94px"
          height="32px"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="35px"
          left="164px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="User&#xA;"
          {...getOverrideProps(overrides, "User")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="20px"
          fontWeight="400"
          color="rgba(255,255,255,1)"
          lineHeight="24.204544067382812px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="94px"
          height="32px"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="35px"
          left="630px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Points"
          {...getOverrideProps(overrides, "Points")}
        ></Text>
        <Icon
          width="786px"
          height="0px"
          viewBox={{ minX: 0, minY: 0, width: 786, height: 1 }}
          paths={[
            {
              d: "M0 0L786 0L786 -1L0 -1L0 0Z",
              stroke: "rgba(255,255,255,1)",
              fillRule: "nonzero",
              strokeWidth: 1,
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="72px"
          left="20px"
          {...getOverrideProps(overrides, "Line 2")}
        ></Icon>
        <View
          width="98px"
          height="438px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          position="absolute"
          top="96px"
          left="20px"
          borderRadius="25px 0px 0px 25px"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(49,49,49,1)"
          {...getOverrideProps(overrides, "Frame 469")}
        ></View>
        <View
          width="688px"
          height="438px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          position="absolute"
          top="96px"
          left="118px"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(49,49,49,1)"
          {...getOverrideProps(overrides, "Frame 470")}
        ></View>
      </View>
      <Text
        fontFamily="Inter"
        fontSize="48px"
        fontWeight="400"
        color="rgba(255,255,255,1)"
        lineHeight="58.09090805053711px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="358px"
        height="70px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="30px"
        left="53px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Leaderboard"
        {...getOverrideProps(overrides, "Leaderboard5080772")}
      ></Text>
      <Button
        width="unset"
        height="unset"
        position="absolute"
        top="44px"
        left="526px"
        size="default"
        isDisabled={false}
        variation="default"
        children="By Post"
        {...getOverrideProps(overrides, "Button50801348")}
      ></Button>
      <Button
        width="unset"
        height="unset"
        position="absolute"
        top="44px"
        left="751px"
        size="default"
        isDisabled={false}
        variation="default"
        children="By User"
        {...getOverrideProps(overrides, "Button50801352")}
      ></Button>
    </View>
  );
}
