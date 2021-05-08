const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  env: {
    FIREBASE_STORAGEBUCKET: FIREBASE_STORAGEBUCKET ? FIREBASE_STORAGEBUCKET : "mylife-stories.appspot.com",
    FIREBASE_PROJECTID: FIREBASE_PROJECTID? FIREBASE_PROJECTID : "mylife-stories",
    FIREBASE_PRIVATEKEY: process.env.FIREBASE_PRIVATKEY,
    FIREBASE_CLIENTEMAIL: FIREBASE_CLIENTEMAIL ? : FIREBASE_CLIENTEMAIL "firebase-adminsdk-46bv6@mylife-stories.iam.gserviceaccount.com"
  }
})
