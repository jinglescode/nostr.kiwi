import { useCommunityFollowers } from "@/libs/ndk/hooks/useCommunityFollowers";
import {
  Block,
  BlockTitle,
  List,
  ListItem,
  Navbar,
  Page,
} from "framework7-react";
import CommunityCard from "./CommunityCard";
import UserHeader from "../user/UserHeader";
import { useCommunity } from "@/libs/ndk/hooks/useCommunity";

export default function CommunityInfoPage({ id }: { id: string }) {
  const { data: community } = useCommunity(id);

  const { data: communityFollowers } = useCommunityFollowers(community?.id);

  if (community === undefined) return <></>;

  const formatBio = (text: string) => {
    text = text.trim();
    text = text.replace(/(\n\n\n)/, "\n");
    return text;
  };

  return (
    <Page>
      <Navbar backLink="Back" title={community.name}></Navbar>
      <CommunityCard community={community} style={4} />

      {community.description && (
        <>
          <BlockTitle>Description</BlockTitle>
          <Block>{formatBio(community.description)}</Block>
        </>
      )}

      {community.rules && (
        <>
          <BlockTitle>Rules</BlockTitle>
          <Block>{formatBio(community.rules)}</Block>
        </>
      )}

      {community.tags && community.tags.length > 0 && (
        <>
          <BlockTitle>Tags</BlockTitle>
          <List inset>
            {community.tags.map((tag, i) => (
              <ListItem title={tag} key={i} />
            ))}
          </List>
        </>
      )}

      <BlockTitle>Moderators</BlockTitle>
      <List inset>
        {community.moderators.map((moderator, i) => (
          <UserHeader npub={moderator} key={i} />
        ))}
      </List>

      {communityFollowers && communityFollowers.length > 0 && (
        <>
          <BlockTitle>Members</BlockTitle>
          <List inset>
            {communityFollowers.map((pk, i) => (
              <UserHeader npub={pk} key={i} />
            ))}
          </List>
        </>
      )}
    </Page>
  );
}
