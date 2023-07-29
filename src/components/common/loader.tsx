import { Block, Preloader } from "framework7-react";

export default function Loader({ label }: { label?: string }) {
  return (
    <Block className="text-center">
      <Preloader color="primary" />
      {label && <p>{label}</p>}
    </Block>
  );
}
