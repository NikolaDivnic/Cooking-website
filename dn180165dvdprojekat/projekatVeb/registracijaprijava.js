$(document).ready(function(){
   
    $("#registracija").click(function(){

        localStorage.setItem("korisnik", "");
        localStorage.setItem("ulogovan" , false);
        let ime = $("#korisnickoimeRegistracija").val();
      
        let lozinka = $("#sifraRegistracija").val();
        
        if(ime == "" || lozinka == ""){
          return;

        }
        else{
            
            let ima = localStorage.getItem(ime);
            if(ima != null){ 
                alert("Ima takvog korisnika !");
            }
            else{
                let korisnik = {"korisnickoIme" : ime, "lozinka" : lozinka };
                localStorage.setItem(ime, JSON.stringify(korisnik));
                localStorage.setItem("korisnik", ime);
                localStorage.setItem("ulogovan" , true);
                window.location.href = "index.html";
                return false;
            }
            
        }
    })

    $("#dugmePrijava").click(function(){
        localStorage.setItem("korisnik", "");
        localStorage.setItem("ulogovan" , false);
        let ime = $("#korisnickoImePrijava").val();
        let lozinka = $("#lozinkaPrijava").val();
        let pom = localStorage.getItem(ime);
        
        if (ime != "" && lozinka != ""){
           
            if(pom == null){
                alert("Ne postoji taj korisnik!");
             }
             else{
                 let l = JSON.parse(pom);
                 let loz = l.lozinka;
                 if (loz != lozinka){
                     alert("Niste lepo uneli lozinku!");
                 }
                 else 
                 {
                     localStorage.setItem("korisnik", ime);
                     localStorage.setItem("ulogovan" , true);
                     window.location.href = "index.html";
                     return false;
                 }
             }
        }
        
    })

  

})