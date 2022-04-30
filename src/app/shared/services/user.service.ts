import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName: string = 'Users';

  constructor(private angularFirestrore: AngularFirestore) {}

  create(user: User) {
    return this.angularFirestrore.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getById(id: string) {
    return this.angularFirestrore.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  update(userId: string, user: Partial<User>) {
    return this.angularFirestrore.collection<User>(this.collectionName).doc(userId).update(user);
  }

  delete(id: string) {
    return this.angularFirestrore.collection<User>(this.collectionName).doc(id).delete();
  }
}
