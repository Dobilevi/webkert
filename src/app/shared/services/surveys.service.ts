import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Survey} from "../models/Survey";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  collectionName: string = 'Surveys';

  constructor(private angularFirestrore: AngularFirestore) { }

  getAll(): Observable<Array<Survey>>{
    return this.angularFirestrore.collection<Survey>(this.collectionName).valueChanges();
  }
}
