import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {SurveyData} from "../models/SurveyData";
import {user} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class SurveyDataService {

  collectionName: string = 'SurveyData';

  constructor(private angularFirestore: AngularFirestore) { }

  create(surveyData: SurveyData) {
    return this.angularFirestore.collection<SurveyData>(this.collectionName).doc(surveyData.surveyId + surveyData.userId).set(surveyData);
  }

  getByUserId(userId: string, orderBy?: string, asc?: boolean) {
    return (orderBy) ?
      (this.angularFirestore.collection<SurveyData>(this.collectionName, ref => ref.where('userId', '==', userId).orderBy(orderBy, (asc) ? ('asc') : ('desc'))).valueChanges()) :
      (this.angularFirestore.collection<SurveyData>(this.collectionName, ref => ref.where('userId', '==', userId)).valueChanges());
  }

  getAll() {
    return this.angularFirestore.collection<SurveyData>(this.collectionName).valueChanges();
  }

  read(surveyId: string, userId: string) {
    return this.angularFirestore.collection<SurveyData>(this.collectionName).doc(surveyId + userId).valueChanges();
  }

  update(surveyData: SurveyData) {
    return this.angularFirestore.collection<SurveyData>(this.collectionName).doc(surveyData.surveyId + surveyData.userId).update(surveyData);
  }

  delete(userId: string, surveyId: string) {
    return this.angularFirestore.collection<SurveyData>(this.collectionName).doc(surveyId + userId).delete();
  }
}
