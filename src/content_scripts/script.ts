import { SHOW_PAGEACTION, HIDE_PAGEACTION } from "../common/messageTypes";

const isShoppingSite = (): boolean => {
  try {
    const metaTags = Array.from(document.getElementsByTagName("META"));
    return shopStringExistsInMetadata(metaTags);
  } catch (err) {
    console.log(err);
  }
};

const shopStringExistsInMetadata = (metaTags: Element[]) => {
  const shopStringExists = (value: Element, index: number, array: Element[]) => {
    return (value as HTMLMetaElement).content.toLowerCase().indexOf("shop") !== -1;
  };

  return metaTags.some(shopStringExists);
};

if (isShoppingSite()) {
  chrome.runtime.sendMessage({ type: SHOW_PAGEACTION });
} else {
  chrome.runtime.sendMessage({ type: HIDE_PAGEACTION });
}
