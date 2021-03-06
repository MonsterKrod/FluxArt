const ConnexioDB = require('./ConnexioDB');

//Definicio de totes les queries generiques
class Query extends ConnexioDB {

  constructor(){}

  static querySeleccio(nom_colleccio , condicio , excloureCamps)
  {
    return new Promise((resolve , reject) =>{

      super.obtenirConnexio()
      .then((db)=> {

          let colleccio = db.collection(nom_colleccio);
          colleccio.find(condicio , excloureCamps).toArray((err, docs) => {
            Query.resoldrePeticio(db , resolve , reject , err , docs);
          });
          //colleccio.find(condicio) retorna un cursor , guardar els documents en array en memoria i alliberant el recurs BD
        })
        .catch((err)=> console.log(err));
    })
  }

  static querySeleccioLimitat(nom_colleccio , condicio  , quantitat , filtrar , excloureCamps)
  {
    return new Promise((resolve , reject) =>{

      super.obtenirConnexio()
      .then((db)=> {

          let colleccio = db.collection(nom_colleccio);
          colleccio.find(condicio , excloureCamps).sort(filtrar).limit(quantitat).toArray((err, docs) => {
            Query.resoldrePeticio(db , resolve , reject , err , docs);
          });
        })
        .catch((err)=> console.log(err));
    })
  }

  static querySeleccioLimit(nom_colleccio , condicio , quantitat , filtrar , excloureCamps)
  {
    return new Promise((resolve , reject) =>{

      super.obtenirConnexio()
      .then((db)=> {

          let colleccio = db.collection(nom_colleccio);
          colleccio.find(condicio , excloureCamps).sort(filtrar).limit(quantitat).toArray((err, docs) => {
            Query.resoldrePeticio(db , resolve , reject , err , docs);
          });
        }).catch((err)=> console.log(err));
    })
  }

  static queryContar(nom_colleccio  , condicio)
  {
    return new Promise((resolve , reject) =>{

      super.obtenirConnexio()
      .then((db)=> {

          let colleccio = db.collection(nom_colleccio);
          colleccio.count(condicio , (err , count)=>{

            if(err)
              reject(err);

            resolve(count);
          });
        }).catch((err)=> console.log(err));
    })
  }

  static queryInsercio(nom_colleccio , document)
  {
    return new Promise((resolve , reject) =>{

      super.obtenirConnexio()
      .then((db)=> {

          let colleccio = db.collection(nom_colleccio);
          colleccio.insertOne(document , (err, resultat) => {
            Query.resoldrePeticio(db , resolve , reject , err , resultat);
          });
        })
        .catch((err)=> console.log(err));
    })
  }

  static queryEliminacio(nom_colleccio , condicio)
  {
    return new Promise((resolve , reject) =>{

      super.obtenirConnexio()
      .then((db)=> {

          let colleccio = db.collection(nom_colleccio);
          colleccio.remove(condicio , (err, resultat) => {
            Query.resoldrePeticio(db , resolve , reject , err , resultat);
          });
        })
        .catch((err)=> console.log(err));
    })
  }

  static queryActualitzacio(nom_colleccio , condicio , valorNou)
  {
    return new Promise((resolve , reject) =>{

      super.obtenirConnexio()
      .then((db)=> {

          let colleccio = db.collection(nom_colleccio);
          colleccio.updateOne(condicio , valorNou , (err, resultat) => {
            Query.resoldrePeticio(db , resolve , reject , err , resultat);
          });
        })
        .catch((err)=> console.log(err));
    })
  }

  static queryActualitzacioArray(nom_colleccio , condicio , operacioArray)
  {
    return new Promise((resolve , reject) =>{

      super.obtenirConnexio()
      .then((db)=> {
          let colleccio = db.collection(nom_colleccio);
          colleccio.update(condicio , operacioArray , (err, resultat) => {
            Query.resoldrePeticio(db , resolve , reject , err , resultat);
          });
        })
        .catch((err)=> console.log(err));
    })
  }

  static queryActualitzacioLliure(nom_colleccio , condicio , condicioDos)
  {
    return new Promise((resolve , reject) =>{

      super.obtenirConnexio()
      .then((db)=> {

          let colleccio = db.collection(nom_colleccio);
          colleccio.update({condicio , condicioDos} , (err, resultat) => {
            Query.resoldrePeticio(db , resolve , reject , err , resultat);
          });
        })
        .catch((err)=> console.log(err));
    })
  }

  static resoldrePeticio(db , resolve , reject , err , resultat)
  {
    if(err)
    { //Si no hi ha error tencar la Connexio a la bd i notificar error
      db.close();
      reject(err)
    }
    else {
      db.close(); //Si tot va be recuperant resultat  i tancant bd
      resolve(resultat);
    }
  }
}

module.exports = Query;
