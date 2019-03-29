import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.models';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor(public _deseosService:DeseosService, private _router:Router, private _alertCtrl:AlertController) { }

  ngOnInit() {}

  listaSeleccionada( lista:  Lista){
    console.log(lista);
    if (this.terminada){
      this._router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
      this._router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista( lista: Lista){
    this._deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista){
    const alert = await this._alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data)=>{
            console.log(data);
            if ( data.titulo.length === 0){
              return;
            };
            lista.titulo = data.titulo;
            this._deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }

}
