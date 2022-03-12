$(document).ready(function(){
    var ulogovan = localStorage.getItem("ulogovan");
    if (ulogovan == null || ulogovan == "false") {
        window.location.href = "prijavaEngleski.html";
    }


    let niz = JSON.parse(localStorage.getItem("ponude")) || [];
    var korisnik = localStorage.getItem("korisnik");
    for (let i = 0; i < niz.length; i++) {
        
        let element = niz[i];
        if (element.korisnik ==korisnik ){
            let slike = element.slika.split("\\");
            let konacnaSlika = "slikeRecepata\\" + slike[2];
            
            $(".nalog").append('<div class="col-sm-12 col-md-4 recept" ><div class="card" style="width: 18rem;"><img class="card-img-top" src=" '+ konacnaSlika+'" alt="Card image cap"><div class="card-body"><h5 class="card-title">' +element.naslov+'</h5><a href="recept.html" class="btn btn-primary kliknutRecept" id = "' +element.korisnik+"@"+ element.naslov+'">Recept</a> <a href="mojnalog.html" class="btn btn-danger obrisiRecept" id = "' +"@"+element.korisnik+"@"+ element.naslov + '">Obrisi</a> </div></div> </div>');
        }
        
    }


    let nizKomentara = JSON.parse(localStorage.getItem("komentari")) || [];
    
    for (let i = 0; i < nizKomentara.length; i++) {
        
        let komentar = nizKomentara[i];
        let naslov = komentar.naslov.split("@")[1];
        if (komentar.korisnik ==korisnik ){
            
            $(".komentari").append('<li class="media"><div class="media-left"></div><div class="media-body "><h4 class="media-heading">Recipe: '+naslov+'<br></h4><p>Comment: '+komentar.tekst+'</p></div></li>');
        }
        
    }

    let nizOcena = JSON.parse(localStorage.getItem("ocene")) || [];
    
    for (let i = 0; i < nizOcena.length; i++) {
        
        let komentar = nizOcena[i];
        let naslov = komentar.naslov.split("@")[1];
        if (komentar.korisnik ==korisnik ){
            
            $(".ocene").append('<li class="media"><div class="media-left"></div><div class="media-body "><h4 class="media-heading">Recipe: '+naslov+'<br></h4><p>Rating: '+komentar.ocena+'</p></div></li>');
        }
        
    }

    
    $(".kliknutRecept").click(function(){
        localStorage.setItem("recept" , $(this).attr('id'))
    })
  
    $(".obrisiRecept").click(function(){
        let niz = JSON.parse(localStorage.getItem("ponude")) || [];
        let pom = $(this).attr('id');
        var korisnik = pom.split("@")[1];
        var naslov = pom.split("@")[2];
        var drugiNiz = [];
        for (let i = 0; i < niz.length; i++) {
            var element = niz[i];
            if (!(element.naslov == naslov && element.korisnik == korisnik)){
                drugiNiz.push(element);
            }
        }
        localStorage.setItem("ponude", JSON.stringify(drugiNiz));
    })
   
})