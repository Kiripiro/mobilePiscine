import { Entry } from "@/types/Entry";
import {
  getFirestore,
  collection,
  CollectionReference,
  DocumentData,
  query,
  limit,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";

class FirebaseService {
  private collectionRef: CollectionReference<DocumentData>;

  constructor(private collectionName: string) {
    this.collectionRef = collection(getFirestore(), this.collectionName);
  }

  async ensureCollectionExists(): Promise<void> {
    const q = query(this.collectionRef, limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      await addDoc(this.collectionRef, { initialized: true });
    } else {
      console.warn(`Collection '${this.collectionName}' déjà existante.`);
    }
  }

  public async addDocument(data: object): Promise<void> {
    try {
      await this.ensureCollectionExists();
      await addDoc(this.collectionRef, data);
    } catch (error) {
      console.error("Erreur lors de l’ajout du document:", error);
    }
  }

  public async deleteDocument(entry: Entry): Promise<void> {
    try {
      const q = query(
        this.collectionRef,
        where("userEmail", "==", entry.userEmail),
        where("title", "==", entry.title)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return;
      }

      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(this.collectionRef, document.id));
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'entrée :", error);
    }
  }

  public async getDocuments(email: string): Promise<DocumentData[]> {
    if (!email || typeof email !== "string" || email.trim() === "") {
      return [];
    }

    try {
      const q = query(
        this.collectionRef,
        where("userEmail", "==", email),
        orderBy("date", "desc")
      );

      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return [];
      }

      const documents = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });

      return documents;
    } catch (error) {
      console.error("Erreur lors de la récupération des documents:", error);
      return [];
    }
  }
}

export default FirebaseService;
