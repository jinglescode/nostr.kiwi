import InputSearch from "@/components/common/form/InputSearch";
import { Block, Link, List, Sheet, Toolbar } from "framework7-react";
import { useEffect, useRef, useState } from "react";

let timeout: any;

export default function GifSearch({
  gifSearchOpened,
  setGifSearchOpened,
  appendText,
}: {
  gifSearchOpened: boolean;
  setGifSearchOpened: Function;
  appendText: Function;
}) {
  const [inputSearch, setInputSearch] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TenorResult[]>([]);
  const text = useRef<string>("");

  function search(keywords: string) {
    if (keywords.length > 0) {
      fetch(`/api/searchtenor?search=${inputSearch}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data.results);
        })
        .catch((err) => console.error(err));
    }
  }

  function addGifToText(url: string) {
    appendText(`\n\n${url}`);
    setInputSearch("");
    setSearchResults([]);
    setGifSearchOpened(false);
  }

  function onInputChange(e: any) {
    text.current = e.target.value.toLowerCase();
    setInputSearch(text.current);
  }

  function debounce(callback: Function, delay: number) {
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(callback, delay);
    };
  }

  useEffect(() => {
    if (searchTerm.length > 0) {
      search(searchTerm);
    }
  }, [searchTerm]);

  return (
    <Sheet
      opened={gifSearchOpened}
      onSheetClosed={() => setGifSearchOpened(false)}
    >
      <Toolbar top>
        <div className="left">
          <InputSearch
            label="Search GIFs"
            placeholder="Search for GIFs"
            // onChange={(e) => setInputSearch(e.target.value.toLowerCase())}
            onChange={onInputChange}
            value={inputSearch}
            // onInput={handleKeyUp}
            onInput={debounce(() => setSearchTerm(text.current), 1000)}
            onValueClear={() => {
              setInputSearch("");
            }}
          />
        </div>
        <div className="right">
          <Link onClick={() => setGifSearchOpened(false)}>Done</Link>
        </div>
      </Toolbar>
      {/* <List className="m-0">
        <InputSearch
          label="Search GIFs"
          placeholder="Search for GIFs"
          onChange={(e) => setInputSearch(e.target.value.toLowerCase())}
          value={inputSearch}
          // onInput={handleKeyUp}
          onInput={debounce(() => setSearchTerm(text.current), 1000)}
          onValueClear={() => {
            setInputSearch("");
          }}
        /> */}

      <div className="h-64">
        <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto mt-2">
          {searchResults.map((result, i) => {
            return (
              <div
                key={i}
                onClick={() => addGifToText(result.media_formats.gif.url)}
              >
                <img
                  src={result.media_formats.tinygif.url}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* </List> */}
    </Sheet>
  );
}

type TenorResult = {
  media_formats: {
    gif: { url: string };
    tinygif: { url: string };
  };
};
