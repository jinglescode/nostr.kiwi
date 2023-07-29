import { Block } from "framework7-react";
import Head from "next/head";

const Fallback = () => (
  <>
    <Head>
      <title>Kiwi</title>
    </Head>
    <Block className="text-center">
      <p>You may be offline. Unable to connect to relay.</p>
    </Block>
  </>
);

export default Fallback;
