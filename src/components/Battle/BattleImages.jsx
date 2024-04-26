import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { generateClient } from "aws-amplify/api";
import { UserContext } from "../../UserContext";
import "./board.css";
import {
  listPosts,
  listBattles,
  listFriends,
  listFriendRequests,
} from "../../graphql/queries";
import { View, Text, Button, Collection, Card } from "@aws-amplify/ui-react";
import BattlePending from "./BattlePending";
import { uploadData, getUrl } from "aws-amplify/storage";
import {
  createBattle,
  deleteBattle,
  updateBattle,
} from "../../graphql/mutations";
import toast, { Toaster } from "react-hot-toast";
import { Message, Image } from "@aws-amplify/ui-react";

const BattleImages = (props) => {
  const { image1, image2 } = props;

  const items = [image1, image2];

  return (
    <Collection
      items={items}
      type="list"
      direction="row"
      gap="20px"
      wrap="nowrap"
    >
      {(item, index) => (
        <Card
          key={index}
          borderRadius="medium"
          maxWidth="20rem"
          variation="outlined"
        >
          <Image src={item} />
        </Card>
      )}
    </Collection>
  );
};

export default BattleImages;
