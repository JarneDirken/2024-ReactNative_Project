import { firebase } from "../config/config"
import { collection, getDocs, doc, getDoc, getFirestore } from "firebase/firestore";

const firestore = getFirestore(firebase);

export async function GET_EXPENSES() {
    const expensesCollectionRef = collection(firestore, "expenses");
    const snapshot = await getDocs(expensesCollectionRef);
    const expensesList = [];

    for (const expenseDoc of snapshot.docs) {
        const expenseData = expenseDoc.data();
        const typeId = expenseData.typeId;

        // Get the type document based on the typeId
        const typeDocRef = doc(firestore, "types", typeId);
        const typeDocSnapshot = await getDoc(typeDocRef);

        if (typeDocSnapshot.exists()) {
            const typeData = typeDocSnapshot.data();
            const expenseWithType = {
                ...expenseData,
                typeName: typeData.name
            };
            expensesList.push(expenseWithType);
        } else {
            console.error(`Type document with ID ${typeId} not found for expense.`);
        }
    }
    return expensesList;
}