export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const MAGIC_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || "pk_test_AE64906CD75F2354";

export const STRIPE_PK =
  process.env.NEXT_PUBLIC_STRIPE_PK ||
  "pk_test_51I1AY7KYvEtNNTweezFYgVHEeXZssEk3qOYAXQ0f2cutFmMceyeM0tzyy9rnXHeedQXZnOjW3QhKOFNXDs1hDYez00eLadC4a0";

/**
 * Given an image return the Url
 * Works for local and deplyed strapis
 * @param {any} image
 */
export const fromImageToUrl = (image) => {
  if (!image) {
    return "/vercel.svg";
  }
  if (image.url.indexOf("/") === 0) {
    return `${API_URL}${image.url}`;
  }

  return image.url;
};
