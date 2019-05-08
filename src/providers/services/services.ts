import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Storage
} from '@ionic/storage';


@Injectable()
export class ServicesProvider {

  constructor(public http: HttpClient, private storage: Storage) {}

  login(user: any = {}) {
    console.log(user);
    return this.http.post('https://boiling-sea-85546.herokuapp.com/api/user/login', user);
  }
  register(user: any = {}) {
    user.role = 'Empleado';
    console.log(user);
    return this.http.post('https://boiling-sea-85546.herokuapp.com/api/user', user);
  }
  ListByRol(token) {

    let headersOptions = {
      'Authorization': token
    };
    return this.http.get('https://boiling-sea-85546.herokuapp.com/api/users?role=' + 'Empleado', {
      headers: headersOptions
    });

  }

  CheckUser(token) {

    let headersOptions = {
      'Authorization': token
    };
    return this.http.get('https://boiling-sea-85546.herokuapp.com/api/user', {
      headers: headersOptions
    });
  }

  SaveInform(informe: any, token: any) {
    let headersOptions = {
      'Authorization': token
    };
    console.log(informe);
    return this.http.post('https://boiling-sea-85546.herokuapp.com/api/informe', informe, {
      headers: headersOptions
    });
  }

  ListInformByUser(id: any, token: any) {
    let headersOptions = {
      'Authorization': token
    };
    console.log(id);
    return this.http.get('https://boiling-sea-85546.herokuapp.com/api/informe?user=' + id, {
      headers: headersOptions
    });
  }

  DeleteInformById(inform, token){
    let headersOptions = {
      'Authorization': token
    };
    return this.http.delete('https://boiling-sea-85546.herokuapp.com/api/informe?id=' + inform._id, {
      headers: headersOptions
    });
  }

  DeleteUser(user, token) {
    let headersOptions = {
      'Authorization': token
    };
    console.log(user);
    
    return this.http.delete('https://boiling-sea-85546.herokuapp.com/api/user?id=' + user._id, {
      headers: headersOptions
    });
  }
}
