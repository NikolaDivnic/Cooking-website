$(document).ready(function(){


    let niz = JSON.parse(localStorage.getItem("ponude")) || [];
    for (let i = 0; i < niz.length; i++) {
        
        let element = niz[i];
        if (element.kategorija == "Glavno jelo"){
            let slike = element.slika.split("\\");
            let konacnaSlika = "slikeRecepata\\" + slike[2];
            
            $(".glavnajela").append('<div class="col-sm-12 col-md-4 recept" ><div class="card" style="width: 18rem;"><img class="card-img-top" src=" '+ konacnaSlika+'" alt="Card image cap"><div class="card-body"><h5 class="card-title">' +element.naslov+'</h5><a href="recept.html" class="btn btn-primary kliknutrecept" id = "' +element.korisnik+"@"+ element.naslov+'">Recept</a>  </div></div> </div>');
        }
        
    }
    
    $("#sortiranjeDugme").click(function(){
        let pom = $("#sortiranje").val();
        $(".glavnajela").empty();
        let niz = JSON.parse(localStorage.getItem("ponude")) || [];
        if (pom == "tezinaRastuce"){
            niz.sort(function(a, b){return parseInt(a.tezina)-parseInt(b.tezina)});
        }
        if (pom == "teziniOpadajuce") {
            niz.sort(function(a, b){return -parseInt(a.tezina)+parseInt(b.tezina)});
        }
        if (pom == "oceniRastuce") {
            niz.sort(function(a, b){return parseFloat(a.ocena)- parseFloat  (b.ocena)});
        }
        if (pom == "oceniOpadajuce") {
            niz.sort(function(a, b){return -parseFloat(a.ocena)+parseFloat(b.ocena)});
        }
        for (let i = 0; i < niz.length; i++) {
            let element = niz[i];
            if (element.kategorija == "Glavno jelo"){
                let slike = element.slika.split("\\");
                let konacnaSlika = "slikeRecepata\\" + slike[2];
                
                $(".glavnajela").append('<div class="col-sm-12 col-md-4 recept" ><div class="card" style="width: 18rem;"><img class="card-img-top" src=" '+ konacnaSlika+'" alt="Card image cap"><div class="card-body"><h5 class="card-title">' +element.naslov+'</h5><a href="recept.html" class="btn btn-primary kliknutrecept" id = "' +element.korisnik+"@"+ element.naslov+'">Recept</a>  </div></div> </div>');
            }
        }
        $(".kliknutrecept").click(function(){
            
            localStorage.setItem("recept" , $(this).attr('id'));
            
        })
    })
    
    $("#pretraga").click(function(){

        let tekstPretrage = $("#tekstPretrage").val();
        $(".glavnajela").empty();
        let niz = JSON.parse(localStorage.getItem("ponude")) || [];
        for (let i = 0; i < niz.length; i++) {
            
            let element = niz[i];
            if (element.naslov.includes( tekstPretrage) && element.kategorija == "Glavno jelo"){
                let slike = element.slika.split("\\");
                let konacnaSlika = "slikeRecepata\\" + slike[2];
                $(".glavnajela").append('<div class="col-sm-12 col-md-4 recept" ><div class="card" style="width: 18rem;"><img class="card-img-top" src=" '+ konacnaSlika+'" alt="Card image cap"><div class="card-body"><h5 class="card-title">' +element.naslov+'</h5><a href="recept.html" class="btn btn-primary kliknutrecept" id = "' +element.korisnik+"@"+ element.naslov+'">Recept</a>  </div></div> </div>');
            }
        }
        $(".kliknutrecept").click(function(){
            
            localStorage.setItem("recept" , $(this).attr('id'));
            
        })
    })

    $(".kliknutrecept").click(function(){
       
        localStorage.setItem("recept" , $(this).attr('id'));
       
    })
})