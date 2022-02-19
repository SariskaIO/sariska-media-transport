import { NativeModules } from 'react-native';
/**
 * If WiFiStats native module exist attach it to JitsiMeetGlobalNS.
 */

function getJitsiMeetGlobalNS() {
  if (!window.SariskaMediaTransport) {
    window.SariskaMediaTransport = {};
  }

  if (!window.SariskaMediaTransport.app) {
    window.SariskaMediaTransport.app = {};
  }

  return window.SariskaMediaTransport.app;
}

if (NativeModules.WiFiStats) {
  getJitsiMeetGlobalNS().getWiFiStats = NativeModules.WiFiStats.getWiFiStats;
}