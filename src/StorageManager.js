import axios from 'axios'

export async function getAllMarkerKeysFromStorage(inDocumentID) {
global.maskScreen(true); try {
  const res = await axios.get("/.netlify/functions/getAllMarkerKeysFromStorage",
    { params: { documentID: inDocumentID } }
  );
  global.maskScreen(false);
  return res.data;
} catch (inError) {
  global.maskScreen(false);
  return [];
}
  // const markerKeys = [];
  // for (let i = 0; i < localStorage.length; i++) {
  //   const key = localStorage.key(i);
  //   if (key.startsWith(inDocumentID)) {
  //     markerKeys.push(key);
  //   }
  // }
  // return markerKeys;
}

export async function getMarkerFromStorage(inKey) {

  global.maskScreen(true);
  try {
    const res = await axios.get("/.netlify/functions/getMarkerFromStorage",
      { params: { key: inKey } }
    );
    global.maskScreen(false);
    return res.data.data;
  } catch (inError) {
    global.maskScreen(false);
    throw inError;
  }
}

export async function saveMarkerToStorage(inKey, inMarker, inIsUpdate) {
  global.maskScreen(true);
  try {
    await axios.post("/.netlify/functions/saveMarkerToStorage",
      {
        key: inKey,
        marker: inMarker,
        isUpdate: inIsUpdate
      });
  } catch (inError) {
    console.log("saveMarkerToStorage(): inError", inError);
  }
  global.maskScreen(false);
}