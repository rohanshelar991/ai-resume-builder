import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firebaseDb, firebaseReady } from "./firebase";

export const saveResume = async (uid, resumeId, data) => {
  if (!firebaseReady || !firebaseDb || !uid) return;
  const ref = doc(firebaseDb, "users", uid, "resumes", resumeId);
  await setDoc(
    ref,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
};

export const loadResume = async (uid, resumeId) => {
  if (!firebaseReady || !firebaseDb || !uid) return null;
  const ref = doc(firebaseDb, "users", uid, "resumes", resumeId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

export const listResumes = async (uid) => {
  if (!firebaseReady || !firebaseDb || !uid) return [];
  const ref = collection(firebaseDb, "users", uid, "resumes");
  const q = query(ref, orderBy("updatedAt", "desc"));
  const snaps = await getDocs(q);
  return snaps.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
};
