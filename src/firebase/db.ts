import firestore from "@react-native-firebase/firestore";

// const converter = <T>() => ({
//   toFirestore: (data: T) => data,
//   fromFirestore: (snap: FirebaseFirestoreTypes.QueryDocumentSnapshot) =>
//     snap.data() as T,
// });

// const dataPoint = <T>(collectionPath: string) =>
//   firestore().collection(collectionPath);

const db = {
  Users: firestore().collection("Users"),
  UserTokens: firestore().collection("UserTokens"),
  UserInviteCodes: firestore().collection("UserInviteCodes"),
  UserCharacters: firestore().collection("UserCharacters"),
  UserMemoryOfChaos(scheduleId: string | number, floorId?: string | number) {
    return firestore().collection(
      `UserMemoryOfChaos-${scheduleId}${floorId ? `-${floorId}` : ""}`
    );
  },
  UserPureFiction(scheduleId: string | number, floorId?: string | number) {
    return firestore().collection(
      `UserPureFiction-${scheduleId}${floorId ? `-${floorId}` : ""}`
    );
  },
  UserComments: firestore().collection("UserComments"),
  CharacterComments(charId: string | number) {
    return firestore().collection(`CharacterComments-${charId}`);
  },
  UserCharacterScores(charId: string | number) {
    return firestore().collection(`UserCharacterScores-${charId}`);
  },
  UserFunctionUsage: firestore().collection("UserFunctionUsage"),
};

export default db;
