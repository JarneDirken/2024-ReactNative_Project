import { firebase } from "../config/config"
import { collection, getDocs, doc, getDoc, getFirestore, Timestamp, addDoc } from "firebase/firestore";
import iconData from "../config/iconData.json";

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

export async function POST_EXPENSES(amount, typeKey) {
    const expensesCollectionRef = collection(firestore, "expenses");
    const formattedTypeKey = typeKey.charAt(0).toUpperCase() + typeKey.slice(1);
    const typeId = iconData[formattedTypeKey]?.typeId;


    if (!typeId) {
        console.error(`Type ${typeKey} not found in iconData.`);
        return;
    }

    // Convert amount to a float number before saving
    const numericAmount = parseFloat(amount);

    // Check if the conversion is successful
    if (isNaN(numericAmount)) {
        console.error(`Invalid amount: ${amount}`);
        return;
    }

    const date = Timestamp.fromDate(new Date());

    try {
        const docRef = await addDoc(expensesCollectionRef, {
            amount: numericAmount,
            typeId,
            date
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}