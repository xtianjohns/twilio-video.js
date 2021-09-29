
declare module '@twilio/webrtc' {
  interface MediaStreamTrack {
    foo: string;
  }
}

declare module '@twilio/webrtc/lib/util' {
  function guessBrowser(userAgent?: string) : string;
  function guessBrowserVersion(userAgent?: string) : {major: number, minor: number} | undefined;
}
