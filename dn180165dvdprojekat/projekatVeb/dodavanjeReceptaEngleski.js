$(document).ready(function(){
    
    var ulogovan = localStorage.getItem("ulogovan");
    if (ulogovan == null || ulogovan == "false") {
        window.location.href = "prijavaEngleski.html";
    }
    
    $("#dodajRecept").click(function(){

        let naslov = $("#naslov").val();
        let kategorija = $("#kategorija").val();
        let tezina = $("#tezina").val();
        let priprema = $("#priprema").val();
        let trajanje = $("#trajanje").val();
        let video = $("#unosVidea").val();
        let slike = $("#unosSlike").val();
        if (naslov != "" && kategorija != "" && tezina != "" && priprema!="" && trajanje != "" ){
            

            let k = localStorage.getItem("korisnik");
            let korisnik = {"korisnik" : k ,"naslov" : naslov, "kategorija" : kategorija, "tezina" : tezina , "priprema": priprema, "trajanje": trajanje, "video": video , "slika": slike , "ocena" : 0, "sumaOcena" :0, "brojOcena" :0 , "komentari" : []};
            let niz = JSON.parse(localStorage.getItem("ponude")) || [];
           
            niz.push(korisnik);
            localStorage.setItem("ponude", JSON.stringify(niz));
            //window.location.href = "dodajrecept.html";
        }
        
    })
})