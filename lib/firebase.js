import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARCRn8ltKCCdLMmcew9B-bhzkWmsQFzyE",
  authDomain: "legal-case-app-69b9f.firebaseapp.com",
  projectId: "legal-case-app-69b9f",
  storageBucket: "legal-case-app-69b9f.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
