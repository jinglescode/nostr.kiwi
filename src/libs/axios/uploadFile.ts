import axios from "axios";

export function uploadFile(imagefile: File) {
  var formData = new FormData();
  formData.append("image", imagefile);
  const res = axios.post(
    "https://nostr.build/api/v2/upload/files",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
}


// import axios from "axios";

// export function uploadFile(imagefile: File) {
//   var formData = new FormData();
//   formData.append("image", imagefile);
//   const res = axios.post(
//     // "https://nostr.build/api/v2/upload/files",
//     "http://nostrcheck.me/api/v1/media",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );
//   return res;
// }
