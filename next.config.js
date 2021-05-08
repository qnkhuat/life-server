const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

console.log(process.env.FIREBASE_STORAGE_BUCKET);
console.log(process.env.FIREBASE_PRIVATE_KEY);
module.exports = withBundleAnalyzer({
  env: {
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET ? process.env.FIREBASE_STORAGE_BUCKET : "mylife-stories.appspot.com",
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? process.env.FIREBASE_PROJECT_ID : "mylife-stories",
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? process.env.FIREBASE_CLIENT_EMAIL : "firebase-adminsdk-46bv6@mylife-stories.iam.gserviceaccount.com"
  }
})
