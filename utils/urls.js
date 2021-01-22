export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const STRIPE_PK =
  process.env.NEXT_PUBLIC_STRIPE_PK ||
  "pk_test_51I1AY7KYvEtNNTweezFYgVHEeXZssEk3qOYAXQ0f2cutFmMceyeM0tzyy9rnXHeedQXZnOjW3QhKOFNXDs1hDYez00eLadC4a0";

/**
 * Given an image return the Url
 *
 * @param {Object} image { id, name, url } single object
 */
export const fromImageToUrl = (image) => {
  if (!image) {
    return "/vercel.svg";
  }
  if (image.url.indexOf("/") === 0) {
    // this this in local public folder
    return `${API_URL}${image.url}`;
  }

  return image.url;
};
