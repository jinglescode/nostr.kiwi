import { Block, BlockTitle, Button, List, ListItem } from "framework7-react";
import { useEffect, useState } from "react";
import { TCommunity } from "@/types/Community";
import { useSessionStore } from "@/libs/zustand/session";
import { useNDK } from "@/libs/ndk";
import { useCommunity } from "@/libs/ndk/hooks/useCommunity";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { getPublicKeys } from "@/libs/ndk/utils/getPublicKeys";
import UserHeader from "../user/UserHeader";
import { useCommunityPost } from "@/libs/ndk/hooks/useCommunityPost";
import { useRouter } from "next/router";
import { useUserCommunitiesModerator } from "@/libs/ndk/hooks/useUserCommunitiesModerator";
import Input from "../common/form/Input";

export default function CommunityEditor() {
  const setToastMessage = useSessionStore((state) => state.setToastMessage);
  const user = usePersistUserStore((state) => state.user);
  const setAppPopup = useSessionStore((state) => state.setAppPopup);

  const { signer } = useNDK();

  const router = useRouter();
  let communityId = router.query.id;

  const { data: userCommunitiesModerator } = useUserCommunitiesModerator(
    user?.pk
  );

  const [inputName, setInputName] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [inputImage, setInputImage] = useState<string>("");
  const [inputIdentifier, setInputIdentifier] = useState<string>("");
  const [inputRules, setInputRules] = useState<string>("");
  const [inputModerators, _] = useState<string>("");
  const [listModerators, setListModerators] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [listTags, setListTags] = useState<string[]>([]);

  const { data: communityData } = useCommunity(communityId as string);
  const { mutate: mutateCommunity, isSuccess, isError } = useCommunityPost();

  let editingCommunityInfo = false;
  if (userCommunitiesModerator && communityData) {
    editingCommunityInfo = userCommunitiesModerator.some(
      (communityModerator) => {
        return (
          communityModerator.id === communityData.id &&
          communityModerator.author === user?.pk
        );
      }
    );
  }

  useEffect(() => {
    if (editingCommunityInfo && communityData) {
      setInputName(communityData.name);
      if (communityData.description)
        setInputDescription(communityData.description);
      if (communityData.image) setInputImage(communityData.image);
      setInputIdentifier(communityData.d);
      if (communityData.rules) setInputRules(communityData.rules);
      setListModerators(communityData.moderators);
      setListTags(communityData.tags);
    } else {
      setListModerators([user?.pk!]);
    }
  }, [communityData]);

  useEffect(() => {
    if (isSuccess) {
      setToastMessage(
        editingCommunityInfo ? "Community updated" : "Community created"
      );
      setAppPopup(undefined);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setToastMessage("Something went wrong");
    }
  }, [isError]);

  async function handleButtonClicked() {
    if (signer === undefined) return;
    if (user == undefined) return;

    if (
      inputIdentifier === "" ||
      inputName === "" ||
      inputDescription === "" ||
      inputImage === ""
    ) {
      setToastMessage("Please fill in all fields");
      return;
    }

    const newCommunity: TCommunity = {
      id: `34550:${user.pk}:${inputIdentifier}`,
      name: inputName,
      description: inputDescription,
      image: inputImage,
      d: inputIdentifier,
      author: user.pk,
      moderators: listModerators,
      rules: inputRules,
      eventId: "",
      tags: listTags,
    };

    console.log("create community", newCommunity);

    mutateCommunity(newCommunity);
    ////

    // const newCommunityEvent = new NDKEvent();
    // newCommunityEvent.kind = 34550;

    // newCommunityEvent.tags = [
    //   ["d", newCommunity.d.split(" ").join("")],
    //   ["name", newCommunity.name],
    // ];

    // if (newCommunity.description && newCommunity.description.length > 0)
    //   newCommunityEvent.tags.push(["description", newCommunity.description]);
    // if (newCommunity.image && newCommunity.image.length > 0)
    //   newCommunityEvent.tags.push(["image", newCommunity.image]);
    // if (newCommunity.rules && newCommunity.rules.length > 0)
    //   newCommunityEvent.tags.push(["rules", newCommunity.rules]);

    // if (newCommunity.moderators) {
    //   newCommunity.moderators.forEach((moderator) => {
    //     const pks = getPublicKeys(moderator);
    //     newCommunityEvent.tags.push(["p", pks.pk, "", "moderator"]);
    //   });
    // }

    // if (newCommunity.tags) {
    //   newCommunity.tags.forEach((tag) => {
    //     newCommunityEvent.tags.push(["t", tag]);
    //   });
    // }

    const response = mutateCommunity(newCommunity); // noresponse?
    console.log(123, response);

    // const success = await signPublishEvent(newCommunityEvent);

    // if (success) {
    //   setToastMessage(
    //     editingCommunityInfo ? "Community updated" : "Community created"
    //   );
    //   setAppPopup(undefined);
    // } else {
    //   setToastMessage("Something went wrong");
    // }
  }

  function updateIdentifier(value: string) {
    setInputIdentifier(
      value
        .replace(/[^a-z0-9]/gi, "")
        .split(" ")
        .join("")
    );
  }

  function addModerators(value: string) {
    try {
      const publicKeys = getPublicKeys(value.trim());
      if (publicKeys) {
        if (!listModerators.includes(publicKeys.pk)) {
          setListModerators([...listModerators, publicKeys.pk]);
          setToastMessage("Moderator added");
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  function removeModerator(mod: string) {
    const newList = listModerators.filter((m) => m !== mod);
    setListModerators(newList);
    setToastMessage("Moderator removed");
  }

  function tagHandleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.keyCode === 13) {
      const newList = [...listTags, tag];
      setListTags(newList);
      setTag("");
    }
  }

  function removeTag(tag: string) {
    const newList = listTags.filter((t) => t !== tag);
    setListTags(newList);
  }

  return (
    <>
      <Block>
        <p>
          Community is a space for users to discuss any interest under the sun.
          Here you can create and manage a new community.
        </p>
      </Block>
      <List strongIos insetIos>
        <Input
          value={inputName}
          onChange={(e) => {
            setInputName(e.target.value);
            if (!editingCommunityInfo) {
              updateIdentifier(e.target.value);
            }
          }}
          placeholder="e.g. Coffee Lovers"
          label="Name of this community"
        />

        <Input
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
          placeholder="e.g. We are a community of coffee lovers who want to share our passion with the world."
          label="What is this community about and who should join?"
          type="textarea"
          inputClassName="!h-36 resize-none"
        />

        <Input
          value={inputImage}
          onChange={(e) => setInputImage(e.target.value)}
          placeholder="e.g. https://example.com/image.png"
          label="An image cover for this community"
          info="Sorry you have to do this, upload coming soon"
        />

        <Input
          value={inputRules}
          onChange={(e) => setInputRules(e.target.value)}
          placeholder="e.g. Be nice and have fun! No spamming or advertising. No NSFW content."
          label="What are the rules of this community?"
          type="textarea"
          inputClassName="!h-36 resize-none"
        />
      </List>

      <BlockTitle>Tags</BlockTitle>

      <List strongIos insetIos>
        <Block>Tags are categories to make this community searchable.</Block>

        <Input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="e.g. fishing"
          label="Tag"
          // onKeyUp={tagHandleKeyUp}
        />
        <List inset>
          {listTags.map((tag, i) => {
            return (
              <ListItem
                title={tag}
                key={i}
              >
                <Button small={true} onClick={() => removeTag(tag)}>
                  remove
                </Button>
              </ListItem>
            );
          })}
        </List>
      </List>

      <BlockTitle>Moderators</BlockTitle>

      <List strongIos insetIos>
        <Block>Moderators curates the content in the community.</Block>

        <Input
          value={inputModerators}
          onChange={(e) => addModerators(e.target.value)}
          placeholder="e.g. npub1..."
          label="Appoint moderators"
        />
        <List inset>
          {listModerators.map((mod, i) => {
            return (
              <UserHeader
                key={i}
                npub={mod}
                rightOptions={
                  mod != communityData?.author && (
                    <div className="w-16">
                      <Button small={true} onClick={() => removeModerator(mod)}>
                        remove
                      </Button>
                    </div>
                  )
                }
              />
            );
          })}
        </List>
      </List>

      <BlockTitle>Identifier & Create Community</BlockTitle>

      <List strongIos insetIos>
        <Block>Identifier is a single word to identify this community.</Block>

        <Input
          value={inputIdentifier}
          onChange={(e) => updateIdentifier(e.target.value)}
          placeholder="e.g. coffeelovers"
          label="Identifier"
          disabled={editingCommunityInfo}
          info={editingCommunityInfo ? "This cannot be changed" : ""}
        />

        <Button onClick={() => handleButtonClicked()}>
          {editingCommunityInfo ? "Update info" : "Create community"}
        </Button>
      </List>
    </>
  );
}
