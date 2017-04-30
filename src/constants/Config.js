/**
 * Global App Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
/* global __DEV__ */
const __DEV__ = true;

export default {
  // App Details
  appName: 'QuantaWallet',

  // Build Configuration - eg. Debug or Release?
  DEV: __DEV__,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (__DEV__) ? 'UA-84284256-2' : 'UA-84284256-1',

  // URLs
  urls: {
    resetPassword: 'http://wp-api.mcnam.ee/wp-login.php?action=lostpassword',
    signUp: 'http://wp-api.mcnam.ee/wp-login.php?action=register',
  },
  // Use testnet
  TESTNET: true,
  ETH_API_KEY: 'BGZ7995PJVHFRB7KGQRKWMFRU5UQQMCQWB'
};
