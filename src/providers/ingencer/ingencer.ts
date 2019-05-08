import {
  Injectable
} from '@angular/core';
import {
  AngularFireDatabase
} from '@angular/fire/database';


@Injectable()
export class IngencerProvider {

  constructor(public db: AngularFireDatabase) {}
  public getClientes() {
    return this.db.list('clientes/').valueChanges();
  }
  public saveMaterias(materia) {
    let key = this.db.list('materias/').push(materia).key;
    materia.id = key;
    this.db.database.ref('materias/' + materia.id).set(materia);
  }
  public updateMaterias(materia) {
    this.db.database.ref('materias/' + materia.id).set(materia);
  }
  public getMateria(id) {
    return this.db.object('materias/' + id).valueChanges();
  }
  public removeMateria(materia) {
    this.db.database.ref('materias/' + materia.id).remove();
  }
  public getMessage() {
    return this.db.list('message/').valueChanges();
  }
}
