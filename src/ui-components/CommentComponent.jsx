/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  getOverridesFromVariants,
  mergeVariantsAndOverrides,
} from "./utils";
import { Card, Flex, Icon, Text, TextField, View } from "@aws-amplify/ui-react";
import MyIcon from "./MyIcon";
export default function CommentComponent(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: {
        Comments: {},
        TextField: {},
        MyIcon: {},
        "Frame 453": {},
        Vector: {},
        Frame: {},
        Card: {},
        "Frame 466": {},
        CommentComponent: {},
      },
      variantValues: { state: "Default" },
    },
  ];
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);

  const onClickHandler = () => {
    setComments((comments) => [...comments, comment]);
    setComment(""); 
  };

  const onChangeHandler = (e) => {
     setComment(e.target.value);  
  };
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <View
      width="370px"
      height="624px"
      display="block"
      gap="0"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      borderRadius="20px"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(50,50,50,1)"
      {...getOverrideProps(overrides, "CommentComponent")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="32px"
        fontWeight="700"
        color="rgba(255,255,255,1)"
        lineHeight="24px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="36px"
        left="60px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Comments"
        {...getOverrideProps(overrides, "Comments")}
      ></Text>
      <Flex
        gap="17px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top="542px"
        left="45px"
        padding="0px 0px 0px 0px"
        display="flex"
        {...getOverrideProps(overrides, "Frame 453")}
      >
        <TextField
          width="253px"
          height="unset"
          placeholder="Add a comment...."
          shrink="0"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          size="default"
          isDisabled={false}
          labelHidden={false}
          variation="default"
          value={comment}
          onChange={onChangeHandler}
          style={{ color: 'white' }}
          {...getOverrideProps(overrides, "TextField")}
        ></TextField>
          <MyIcon
            width="33px"
            height="33px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            overflow="hidden"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            type="send"
            onClick={onClickHandler} 
            style={{cursor: "pointer"}}
            {...getOverrideProps(overrides, "MyIcon")}
          ></MyIcon>
      </Flex>
      <View
        width="40px"
        height="40px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="28px"
        left="292px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame")}
      >
        <Icon
          width="22.5px"
          height="25px"
          viewBox={{ minX: 0, minY: 0, width: 22.5, height: 25 }}
          paths={[
            {
              d: "M23.2071 0.707107C23.5976 0.316583 23.5976 -0.316583 23.2071 -0.707107C22.8166 -1.09763 22.1834 -1.09763 21.7929 -0.707107L23.2071 0.707107ZM10 12.5L9.29289 11.7929C8.90237 12.1834 8.90237 12.8166 9.29289 13.2071L10 12.5ZM21.7929 25.7071C22.1834 26.0976 22.8166 26.0976 23.2071 25.7071C23.5976 25.3166 23.5976 24.6834 23.2071 24.2929L21.7929 25.7071ZM13.2071 0.707107C13.5976 0.316583 13.5976 -0.316583 13.2071 -0.707107C12.8166 -1.09763 12.1834 -1.09763 11.7929 -0.707107L13.2071 0.707107ZM0 12.5L-0.707107 11.7929C-1.09763 12.1834 -1.09763 12.8166 -0.707107 13.2071L0 12.5ZM11.7929 25.7071C12.1834 26.0976 12.8166 26.0976 13.2071 25.7071C13.5976 25.3166 13.5976 24.6834 13.2071 24.2929L11.7929 25.7071ZM21.7929 -0.707107L9.29289 11.7929L10.7071 13.2071L23.2071 0.707107L21.7929 -0.707107ZM9.29289 13.2071L21.7929 25.7071L23.2071 24.2929L10.7071 11.7929L9.29289 13.2071ZM11.7929 -0.707107L-0.707107 11.7929L0.707107 13.2071L13.2071 0.707107L11.7929 -0.707107ZM-0.707107 13.2071L11.7929 25.7071L13.2071 24.2929L0.707107 11.7929L-0.707107 13.2071Z",
              stroke: "rgba(255,255,255,1)",
              fillRule: "nonzero",
              strokeLinejoin: "round",
              strokeWidth: 2,
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="18.75%"
          bottom="18.75%"
          left="21.88%"
          right="21.88%"
          {...getOverrideProps(overrides, "Vector")}
        ></Icon>
      </View>
      <View
        width="321px"
        height="373px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="101px"
        left="26px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 466")}
      >
      {comments.map((text) => (
        <Card
          width="302px"
          height="112px"
          position="absolute"
          backgroundColor="rgba(70,70,70,1)"
          top="11px"
          left="10px"
          borderRadius="25px"
          variation="outline"
          style={{margin: 10, wordBreak: "break-all"}}
          {...getOverrideProps(overrides, "Card")}
        >
          <Text color="rgba(255,255,255,1)" style={{margin: 10, wordBreak: "break-all"}}>
            {text}
          </Text>
        </Card>
      ))}
      </View>
    </View>
  );
}
