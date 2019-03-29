import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//import { Lista } from 'src/app/models/lista.models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public _deseosService:DeseosService,
               private _router:Router,
               private alertCtrl: AlertController ){
  }

  async agregarLista(){
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data)=>{
            console.log(data);
            if ( data.titulo.length === 0){
              return;
            };
            const listaId = this._deseosService.crearLista(data.titulo);
            //Tengo que crear la lista
            this._router.navigateByUrl(`/tabs/tab1/agregar/${listaId}` );
          }
        }
      ]
    });

    alert.present();
  }

//  listaSeleccionada( lista:  Lista){
//    console.log(lista);
//    this._router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
//  }
}
