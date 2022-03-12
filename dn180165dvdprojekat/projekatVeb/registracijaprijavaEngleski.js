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
                alert("Allready exists user!");
            }
            else{
                let korisnik = {"korisnickoIme" : ime, "lozinka" : lozinka };
                localStorage.setItem(ime, JSON.stringify(korisnik));
                localStorage.setItem("korisnik", ime);
                localStorage.setItem("ulogovan" , true);
                window.location.href = "indexEngleski.html";
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
                alert("Uncnown user!");
             }
             else{
                 let l = JSON.parse(pom);
                 let loz = l.lozinka;
                 if (loz != lozinka){
                     alert("Enter pasword corectly!");
                 }
                 else 
                 {
                     localStorage.setItem("korisnik", ime);
                     localStorage.setItem("ulogovan" , true);
                     window.location.href = "indexEngleski.html";
                     return false;
                 }
             }
        }
        
    })

  

})