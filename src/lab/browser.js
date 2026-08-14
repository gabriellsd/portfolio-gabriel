export function isEmbeddedBrowser() {
  const ua = navigator.userAgent || ''
  return /Instagram|FBAN|FBAV|FB_IAB|FBOS|Line\/|TikTok|Twitter|Pinterest|Snapchat/i.test(ua)
}
