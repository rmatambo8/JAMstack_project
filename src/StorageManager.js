import axios from 'axios'

const localStorage = global.localStorage;

export async function getAllMarkerKeysFromStorage(inDocumentID) {
  global.maskScreen(true)
  try {
    const res = await axios.get("/.netlify/functions/getAllMarkerKeysFromStorage",
      { params: { documentID: inDocumentID } });
    global.maskScreen(false);
    return res.data
  } catch (error) {
    global.maskScreen(false);
    alert('Sorry, the remote system could not be reached');
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
    const res = await axios.get("/.netlify/funcctions/getMarkerFromStorage",
      { params: { key: inKey } });
    global.maskScreen(false);
    return res.data.data;
  } catch (error) {
    global.maskScreen(false);
    throw error;
  }
  // return JSON.parse(localStorage.getItem(inKey));
}

export async function saveMarkerToStorage(inKey, inMarker, inIsUpdate) {
  global.maskScreen(true);
  try {
    await axios.post("/.netlify/functions/saveMarkerToStorage",
      { key: inKey, marker: inMarker, isUpdate: inIsUpdate });
  } catch (error) {
    console.log("saveMarkerToStorage(): error", error);
  }
  global.maskScreen(false);
  // localStorage.setItem(inKey, JSON.stringify(inMarker));
}