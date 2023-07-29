import { Page } from "framework7-react";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useState } from "react";
import InputSearch from "../common/form/InputSearch";
import CommunitiesList from "./CommunitiesList";

export default function CommunitiesPage() {
  const [inputSearch, setInputSearch] = useState<string>("");

  const user = usePersistUserStore((state) => state.user);

  return (
    <Page>
      <div className="h-full flex flex-col">
        <div>
          <InputSearch
            label="Search"
            placeholder="Search for community"
            onChange={(e) => setInputSearch(e.target.value.toLowerCase())}
            value={inputSearch}
            onValueClear={() => {
              setInputSearch("");
            }}
          />
        </div>

        <CommunitiesList inputSearch={inputSearch} pk={user?.pk} />
      </div>
    </Page>
  );
}
