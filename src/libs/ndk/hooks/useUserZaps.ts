import { STALETIME } from "@/constants/nostr";
import { useNDK } from "@/libs/ndk";
import { TUserZaps } from "@/types/User";
import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";

// todo, need to get from 9734, where pubkey is user
export function useUserZaps(pubkey: string | undefined) {
  const { ndk, fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["user", pubkey, "zaps"],
    async () => {
      // const filter2: NDKFilter = {
      //   kinds: [9734],
      //   authors: [
      //     "efc37e97fa4fad679e464b7a6184009b7cc7605aceb0c5f56b464d2b986a60f0",
      //   ],
      // };

      // const events2 = Array.from(await fetchEventsEOSE(filter2));
      // console.log(9999, "useUserZaps222", events2.length, events2);

      // events2.forEach((e) => {
      //   const eTags = e.tags.filter((t) => t[0] === "e");
      //   if (eTags.length == 1) {
      //     const _eventId = eTags[0][1];
      //     if (
      //       _eventId ==
      //       "2ec7bdea40bbb425a8e72c0b7b3539a39701f26c33538cbc729ebade28f0c5cd"
      //     ) {
      //       console.log(4444, e);
      //     }
      //   }
      // });

      /////
      const filter: NDKFilter = {
        kinds: [9735],
        "#p": [pubkey!],
      };

      const events = Array.from(await fetchEventsEOSE(filter));
      console.log(9999, "useUserZaps", events.length);

      let userZaps: TUserZaps = {};

      // events.forEach((e) => {
      //   const eTags = e.tags.filter((t) => t[0] === "e");
      //   if (eTags.length == 1) {
      //     const _eventId = eTags[0][1];
      //     if (
      //       _eventId ==
      //       "2ec7bdea40bbb425a8e72c0b7b3539a39701f26c33538cbc729ebade28f0c5cd"
      //     ) {
      //       console.log(e);
      //     }
      //     if (!(_eventId in userZaps)) {
      //       userZaps[_eventId] = [];
      //     }

      //     const descriptionTags = e.tags.filter((t) => t[0] === "description");
      //     if (descriptionTags.length == 1) {
      //       const content: { tags: string[][] } = JSON.parse(
      //         descriptionTags[0][1]
      //       );

      //       const amountTags = content.tags.filter((t) => t[0] === "amount");
      //       if (amountTags.length == 1) {
      //         const amount = parseInt(amountTags[0][1]);
      //         userZaps[_eventId].push(amount / 1000);
      //       }
      //     }
      //   }
      // });

      return userZaps;
    },
    {
      enabled: !!pubkey && !!ndk,
      staleTime: STALETIME.feed,
    }
  );

  return { status, data, error, isFetching, refetch };
}
