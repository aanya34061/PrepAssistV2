import { db } from "./firebase";
import { collection, addDoc, getDocs, query, orderBy, limit, Timestamp, writeBatch, doc } from "firebase/firestore";

export interface Question {
  id?: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  createdAt?: Date | any;
}

export async function addQuestion(data: Omit<Question, 'id' | 'createdAt'>) {
  const docRef = await addDoc(collection(db, "question_bank"), {
    ...data,
    createdAt: Timestamp.now()
  });
  return docRef.id;
}

export async function bulkAddQuestions(questions: Omit<Question, 'id' | 'createdAt'>[]) {
  const batch = writeBatch(db);
  const colRef = collection(db, "question_bank");
  
  questions.forEach(q => {
    const docRef = doc(colRef);
    batch.set(docRef, { ...q, createdAt: Timestamp.now() });
  });

  await batch.commit();
}

export async function fetchQuestions(maxResults = 50): Promise<Question[]> {
  const q = query(collection(db, "question_bank"), orderBy("createdAt", "desc"), limit(maxResults));
  const snap = await getDocs(q);
  
  return snap.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Question, 'id'>)
  }));
}
