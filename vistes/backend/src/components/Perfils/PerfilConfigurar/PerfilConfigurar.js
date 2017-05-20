import Utilitat from './../../global/Utilitat.js';

export default {

  data(){
    return {
      url : Utilitat.rutaUrl() + 'frontend/peticio/actualitzar',
      utlDel : Utilitat.rutaUrl() + 'frontend/peticio/eliminar',
      redireccionar : Utilitat.rutaUrl() + '#/iniciarSessio',
      id : "",
      nom:"",
      nomUsuari:"Stephen safjka",
      correu: "",
      pais:"",
      provincia : "",
      contrasenyaActual : "",
      contrasenyaNova : "",
      rebreNotificacions: false,
      comptePaypal : "",
      llocWeb : "",
      compteGoogle : "",
      compteFacebook: ""
    }
  },

  methods: {

    actualitzar(event){

      event.preventDefault();
      // Comprovar si vol cambiar de contrasenyaActual
      Utilitat.peticioPost(this.url , this.$data).then(resultat => {

        if(resultat.actualizat)
        {
          let url = Utilitat.rutaUrl() + "frontend/peticio/dades";
          Utilitat.peticioGet(url).then(dades => {
            this.$store.dispatch('carregarDades' , dades);
            alert('Dades actualitzat');
          });

        }
        else
          alert('dades no actualitzat');
      });
    },

    eliminar(){
      let resultat = confirm("Estas segur que vols eliminar el compte ? , (NO EL PODRAS RECUPERAR!)");

        if(resultat){
          let id  = this.id;
          Utilitat.peticioPost(this.utlDel , {IDUsuari : id}).then(resultat => {
            alert("Ens abandones D: , espero veuret per aquií molt aviat :D");
            Utilitat.redirecionar(this.redireccionar);
          });
        }
    },

    cambiarContrasenya(){

    }

  },

  mounted(){

    Utilitat.esperar(()=>{
      this.id = this.$store.getters.obtenirID;
      this.nom = this.$store.getters.getNom;
      this.nomUsuari = this.$store.getters.getNomUsuari;
      this.correu = this.$store.getters.getCorreu;
      this.rebreNotificacions = this.$store.getters.getNotificacions;
      this.comptePaypal = this.$store.getters.getEnllasPaypal;
      this.llocWeb = this.$store.getters.getEnllasLlocPersonal;
      this.compteGoogle = this.$store.getters.getEnllasGoogle;
      this.compteFacebook = this.$store.getters.getEnllasFacebook;
      this.pais = this.$store.getters.getPais;
      this.provincia = this.$store.getters.getProvincia;
    });
  }
}