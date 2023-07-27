import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { useSessionStore } from "@/libs/zustand/session";
import { ELightningNode } from "@/types/Settings";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Actions,
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
  BlockTitle,
  Button,
  Card,
  Icon,
  List,
  ListInput,
  ListItem,
  Range,
  f7,
} from "framework7-react";
import { useEffect, useRef, useState } from "react";

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
  const pickerDevice = useRef(null);

  useEffect(() => {
    //@ts-ignore
    pickerDevice.current = f7.picker.create({
      inputEl: "#demo-picker-device",
      cols: [
        {
          textAlign: "center",
          values: [
            "Wallets",
            "Alby Nostr Wallet Connect",
            "Custom Nostr Wallet Connect",
          ],
        },
      ],
      on: {
        closed: function (e) {
          //@ts-ignore
          selectedOption(e.displayValue[0] as ELightningNode);
        },
      },
    });
  }, []);

  return (
    <>
      <Card outline title="Zap" headerDivider>
        <BlockTitle>Preferred Lightning wallet</BlockTitle>
        <List outlineIos strongIos>
          <ListInput
            type="text"
            placeholder="Preferred Lightning wallet"
            readonly
            inputId="demo-picker-device"
            value={lightningMode}
            onChange={(e) => {
              console.log(e);
            }}
          />
        </List>

        <BlockTitle className="display-flex justify-content-space-between">
          Default zap amount
        </BlockTitle>
        <List simpleList outlineIos strongIos>
          <ListItem>
            <div>
              <Icon ios="f7:bolt_circle" />
            </div>
            <div style={{ width: "100%", margin: "0 16px" }}>
              <Range
                min={1}
                max={500}
                step={10}
                value={1}
                label={true}
                color="orange"
              />
            </div>
            <div>
              <Icon ios="f7:bolt_circle_fill" />
            </div>
          </ListItem>
        </List>


        {/* <ListInput
            label="Add Zap amount"
            placeholder="e.g. 42"
            value={inputAmount}
            onChange={(e) => {
              //@ts-ignore
              setInputAmount(e.target.value);
            }}
            // onKeyUp={handleKeyUp}
          /> */}

        {/* {zapAmounts.map((amount, i) => {
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
          })} */}
      </Card>

      {/* <Actions
        opened={openOptions}
        onActionsClosed={() => setOpenOptions(false)}
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
      </Actions> */}
    </>
  );
}
