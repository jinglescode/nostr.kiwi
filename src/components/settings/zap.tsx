import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { useSessionStore } from "@/libs/zustand/session";
import { ELightningNode } from "@/types/Settings";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Actions,
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
  Button,
  Card,
  List,
  ListInput,
  ListItem,
  Range,
} from "framework7-react";
import { useState } from "react";

export default function SettingsZap() {
  const defaultZap = usePersistSettingsStore((state) => state.defaultZap);
  const setDefaultZap = usePersistSettingsStore((state) => state.setDefaultZap);
  const zapAmounts = usePersistSettingsStore((state) => state.zapAmounts);
  const setZapAmounts = usePersistSettingsStore((state) => state.setZapAmounts);
  const lightningMode = usePersistSettingsStore((state) => state.lightningMode);
  const setLightningMode = usePersistSettingsStore(
    (state) => state.setLightningMode
  );
  const setNwcConfig = usePersistSettingsStore((state) => state.setNwcConfig);
  const setAppDialog = useSessionStore((state) => state.setAppDialog);

  const [inputAmount, setInputAmount] = useState<string>("");

  const [zapAmountSlider, setZapAmountSlider] = useState<number>(0);
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  function slideZapAmount(amt: string) {
    let amount = parseInt(amt);
    setZapAmountSlider(amount);
    let zap = Math.round(Math.exp((Math.log(999980) / 100) * amount)) + 20;
    setDefaultZap(zap);
  }

  function removeAmount(amount: number) {
    let updatedAmounts = [...zapAmounts];
    const index = updatedAmounts.indexOf(amount);
    if (index !== -1) {
      updatedAmounts.splice(index, 1);
    }
    setZapAmounts(updatedAmounts);
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.keyCode === 13) {
      let updatedAmount = [...zapAmounts];
      updatedAmount.push(parseInt(inputAmount));
      setZapAmounts(updatedAmount);
      setInputAmount("");
    }
  }

  function selectedOption(option: ELightningNode) {
    setOpenOptions(false);
    setLightningMode(option);

    setNwcConfig({});

    if (option === ELightningNode.CustomNWC) {
      setAppDialog({
        customNwc: true,
      });
    }
  }

  return (
    <>
      <Card outline title="Zap" headerDivider>
        <List>
          <h2 className="">Preferred Lightning wallet</h2>

          <ListInput
            value={lightningMode}
            // onClick={() => setOpenOptions(true)}
            disabled={true}
          ></ListInput>

          <h2 className="mt-8">Default Zap amount</h2>

          <ListItem
            // innerClassName="flex space-x-4"
            // innerChildren={
            //   <>
            //     <span>Default amount</span>
            //     <Range
            //       value={zapAmountSlider}
            //       step={1}
            //       min={0}
            //       max={100}
            //       //@ts-ignore
            //       onChange={(e) => slideZapAmount(e.target.value)}
            //     />
            //     <span>{`${defaultZap} sats`}</span>
            //   </>
            // }
          />

          <h2 className="mt-8">Popup Zap amounts</h2>
          <ListInput
            label="Add Zap amount"
            placeholder="e.g. 42"
            value={inputAmount}
            onChange={(e) => {
              //@ts-ignore
              setInputAmount(e.target.value);
            }}
            // onKeyUp={handleKeyUp}
          />

          {zapAmounts.map((amount, i) => {
            return (
              <ListItem
                key={amount}
                title={amount.toString()}
                // after={
                //   <>
                //     <Button onClick={() => removeAmount(amount)}>
                //       <TrashIcon className="w-4 h-4" />
                //     </Button>
                //   </>
                // }
              />
            );
          })}
        </List>
      </Card>

      <Actions
        opened={openOptions}
        // onBackdropClick={() => setOpenOptions(false)}
      >
        <ActionsGroup>
          <ActionsLabel>Select preferred Lightning wallet</ActionsLabel>
          <ActionsButton onClick={() => selectedOption(ELightningNode.Wallets)}>
            Wallets
          </ActionsButton>
          <ActionsButton onClick={() => selectedOption(ELightningNode.AlbyNWC)}>
            Alby Nostr Wallet Connect
          </ActionsButton>
          <ActionsButton
            onClick={() => selectedOption(ELightningNode.CustomNWC)}
          >
            Custom Nostr Wallet Connect
          </ActionsButton>
        </ActionsGroup>
      </Actions>
    </>
  );
}
