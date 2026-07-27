/**
 * Lovable CDN assets are served from a root-relative `/__l5e/assets-v1/...`
 * path that only exists on Lovable hosting. When the app is deployed
 * elsewhere (e.g. Vercel, a custom domain on another host) that path 404s,
 * so we resolve it against an absolute CDN origin instead.
 */
const CDN_ORIGIN = (
  import.meta.env.VITE_LOVABLE_ASSET_ORIGIN ?? "https://opezeni-chairman-os.lovable.app"
).replace(/\/$/, "");

type AssetPointer = { url: string };

export function assetUrl(pointer: AssetPointer | string): string {
  const url = typeof pointer === "string" ? pointer : pointer.url;
  if (/^https?:\/\//.test(url)) return url;
  if (!url.startsWith("/__l5e/")) return url;
  return `${CDN_ORIGIN}${url}`;
}
