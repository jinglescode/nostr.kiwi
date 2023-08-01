import { uploadFile } from "@/libs/axios/uploadFile";
import { useSessionStore } from "@/libs/zustand/session";
import { TImageUpload } from "@/types/Note";
import { ChangeEvent } from "react";

export default function ImageUploader({
  inputFile,
  listOfUploadedImages,
  setlistOfUploadedImages,
  appendText,
}: {
  inputFile: any;
  listOfUploadedImages: TImageUpload[];
  setlistOfUploadedImages: Function;
  appendText: Function;
}) {
  const setToastMessage = useSessionStore((state) => state.setToastMessage);

  async function uploadThisFile(e: ChangeEvent<HTMLInputElement>) {
    try {
      setToastMessage("Uploading...");

      const files = e.target.files;

      if (files === null) return;

      if (files?.length === 0) {
        return;
      }

      const res = await uploadFile(files[0]);

      if (res.status === 200) {
        const resData = res.data.data[0];

        let newImage: TImageUpload = {
          blurhash: resData.blurhash,
          url: resData.url,
          thumbnail: resData.thumbnail,
        };

        if (
          resData.dimensions &&
          resData.dimensions.width &&
          resData.dimensions.height
        ) {
          newImage[
            "dim"
          ] = `${resData.dimensions.width}x${resData.dimensions.height}}`;
        }

        if (resData.responsive && Object.keys(resData.responsive).length) {
          for (let size in resData.responsive) {
            //@ts-ignore
            newImage[`responsive${size}`] = resData.responsive[size];
          }
        }

        setlistOfUploadedImages([...listOfUploadedImages, newImage]);

        appendText(`\n\n${newImage.url}`);

        setToastMessage("Uploaded");
      }
    } catch (err) {
      console.error(err);
      setToastMessage("Error uploading media file");
    }
  }

  return (
    <>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={(event) => {
          uploadThisFile(event);
        }}
      />
    </>
  );
}
