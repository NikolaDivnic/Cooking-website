$(document).ready(function(){


  
    let niz = JSON.parse(localStorage.getItem("ponude")) || [];
    niz.sort(function(a, b){return -parseFloat(a.ocena)+parseFloat(b.ocena)});
    for (let i = 0; i < niz.length && i<3; i++) {
        
        let element = niz[i];
       
            let slike = element.slika.split("\\");
            let konacnaSlika = "slikeRecepata\\" + slike[2];
            
            $(".pocetna").append('<div class="col-sm-12 col-md-4 recept" ><div class="card" style="width: 18rem;"><img class="card-img-top" src=" '+ konacnaSlika+'" alt="Card image cap"><div class="card-body"><h5 class="card-title">' +element.naslov+'</h5><a href="recept.html" class="btn btn-primary kliknutRecept" id = "' +element.korisnik+"@"+ element.naslov+'">Recept</a>  </div></div> </div>');
            
        
    }
    
  
    


    $(".kliknutRecept").click(function(){
        localStorage.setItem("recept" , $(this).attr('id'));
    })
})