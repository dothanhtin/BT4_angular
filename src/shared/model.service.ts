import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {model} from '../app/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private datePipe: DatePipe) { }
  modelList: model[]=[];
  id=0;
  imageUrl='';
  form: FormGroup = new FormGroup({
     $key: new FormControl(null), //$key : id Validators.pattern(/^[a-z]{6,32}$/i)
     id: new FormControl(this.id),
    //  code: new FormControl('',[Validators.pattern('([^+-’=]+)')]),
    code: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9_ ÆÐƎƏƐƔĲŊŒẞÞǷȜæðǝəɛɣĳŋœĸſßþƿȝĄƁÇĐƊĘĦĮƘŁØƠŞȘŢȚŦŲƯY̨Ƴąɓçđɗęħįƙłøơşșţțŧųưy̨ƴÁÀÂÄǍĂĀÃÅǺĄÆǼǢƁĆĊĈČÇĎḌĐƊÐÉÈĖÊËĚĔĒĘẸƎƏƐĠĜǦĞĢƔáàâäǎăāãåǻąæǽǣɓćċĉčçďḍđɗðéèėêëěĕēęẹǝəɛġĝǧğģɣĤḤĦIÍÌİÎÏǏĬĪĨĮỊĲĴĶƘĹĻŁĽĿʼNŃN̈ŇÑŅŊÓÒÔÖǑŎŌÕŐỌØǾƠŒĥḥħıíìiîïǐĭīĩįịĳĵķƙĸĺļłľŀŉńn̈ňñņŋóòôöǒŏōõőọøǿơœŔŘŖŚŜŠŞȘṢẞŤŢṬŦÞÚÙÛÜǓŬŪŨŰŮŲỤƯẂẀŴẄǷÝỲŶŸȲỸƳŹŻŽẒŕřŗſśŝšşșṣßťţṭŧþúùûüǔŭūũűůųụưẃẁŵẅƿýỳŷÿȳỹƴźżžẓ]*$')]),
    name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9_]*$')]),
    birthday: new FormControl('',Validators.required),
    address: new FormControl(''),
    email: new FormControl('',[Validators.required,Validators.email]),
    image: new FormControl('',Validators.required),
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      id:this.id,
      code:"",
      name:"",
      birthday:"",
      address:"",
      email:"",
      image:this.imageUrl
    });
    // this.form.clearValidators();
  }

  getModels() : Observable<model[]>{
    let models = of(this.modelList);
    return models;
  }

  insertModel(model:any) {
    this.id=this.id+1;
    this.modelList.push({
      id:this.id,
      code: model.code,
      name: model.name,
      birthday: model.birthday == "" ? "" : this.datePipe.transform(model.birthday, 'yyyy-MM-dd'),
      email: model.email,
      image: model.image,
      address:model.address
    });
    this.imageUrl='';
    console.log(this.modelList);
}

updateModel(model: any) {
  console.log(model);
 
  let item = this.modelList.find(x => x.id == model.id);
  console.log(item);
  if(item!=null || item!=undefined){
    item.code = model.code;
    item.name = model.name;
    item.birthday = model.birthday == "" ? "" : this.datePipe.transform(model.birthday, 'yyyy-MM-dd')
    item.email = model.email;
    item.image = model.image;
    item.address = model.address;
  }
  this.imageUrl='';
}

deleteModel(code: any){
  let index = this.modelList.findIndex(x => x.code ===code);
  let lstmp = this.modelList.filter(item => item.code != code);
  this.modelList = lstmp;
  this.imageUrl='';
}

populateForm(model: any) {
  this.form.setValue({
    $key:"1",
      name: model.name,
      id:model.id,
      email: model.email,
      code: model.code,
      birthday: model.birthday,
      image: model.image,
      address:model.address
  });
}
}
