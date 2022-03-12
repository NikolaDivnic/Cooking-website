$(document).ready(function(){

    var recept = localStorage.getItem("recept");
    var korisnik = recept.split("@")[0];
    var naslov = recept.split("@")[1];
    var niz = JSON.parse(localStorage.getItem("ponude")) || [];
    var dobarRecept;
    for (let i = 0; i < niz.length; i++) {
        var element = niz[i];
        if (element.naslov == naslov && element.korisnik == korisnik){
            dobarRecept = element;
            let video = element.video.split("\\");
            let konacanVideo = "slikeRecepata\\" + video[2];
            let priprema  = element.priprema;
            let tezina = element.tezina;
            let trajanje = element.trajanje;
            let ocena = element.ocena;
            let slike = element.slika.split("\\");
            let konacnaSlika = "slikeRecepata\\" + slike[2];
            $("#recept").append('<div class="card-header">' +naslov+'</div><div class="card-body"><video width="100%"  controls><source src="'+konacanVideo+'" type=video/mp4 ></video><br><p class="card-text">'+priprema + '</p><br><p>Weight: '+ tezina+'</p><br><p>Duration: '+trajanje+'min</p><p>Rating: '+ocena.toFixed(2) +'</p><img class="d-block w-100" src="'+konacnaSlika+'" alt="First slide"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><span class="glyphicon glyphicon-comment"></span>Comments<br></h3></div><div class="panel-body"><ul class="media-list komentari"></ul><div class="form-group"><label for="exampleFormControlTextarea1">Comment</label><textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div><div style="display: flex; justify-content: space-around;"><button type="button" class="btn btn-primary komentarisi">Comment</button><select class="form-select" aria-label="Default select example" id ="ocenaVrednost"><option value="1">Bad - 1</option><option value="2">Weak - 2</option><option value="3">Okay - 3</option><option value="4">Very good - 4</option><option value="5">Perfect  - 5</option></select><button type="button" class="btn btn-primary" id = "oceni">Assess</button><button type="button" class="btn btn-primary skini">Download pdf</button></div></div></div></div>');

            let kateg;
            let katego;
            if (element.kategorija == "Predjelo"){
                kateg= "predjelaEngleski.html";
                katego = "Appetizer";
            }
            if (element.kategorija == "Glavno jelo"){
                kateg= "glavnajelaEngleski.html";
                katego = "Main course";
            }
            if (element.kategorija == "Desert"){
                kateg= "desertiEngleski.html";
                katego = "Dessert";
            }
            if (element.kategorija == "Uzina"){
                kateg= "uzineEngleski.html";
                katego = "Snack";
            }

           
            $("#putokaz").append('<li class="breadcrumb-item"><a href="">Recipes</a></li><li class="breadcrumb-item"><a href="'+kateg+'">'+katego+'</a></li><li class="breadcrumb-item active" aria-current="page">'+element.naslov+'</li>');

            break;
        }
    }
    var kom = JSON.parse(localStorage.getItem("komentari")) || [];
    for (let i = 0; i < kom.length; i++) {
        let e = kom[i];
        let nas = e.naslov.split("@")[1];
        let kor = e.naslov.split("@")[0];
        if (kor==  korisnik && naslov == nas){
            $(".komentari").append('<li class="media"><div class="media-left"></div><div class="media-body "><h4 class="media-heading">'+e.korisnik+'<br></h4><p>'+e.tekst+'</p></div></li>');
        }
    }
    $(".komentarisi").click(function(){
        let k = localStorage.getItem("korisnik");
        let recept = localStorage.getItem("recept");
        //let naslov = recept.split("@")[1];
        let tekst = $("#exampleFormControlTextarea1").val();
        let komentar = {"korisnik" : k ,"naslov" : recept, "tekst" : tekst};
        let niz = JSON.parse(localStorage.getItem("komentari")) || [];
        
        niz.push(komentar);
        localStorage.setItem("komentari", JSON.stringify(niz));
        window.location.href = "receptEngleski.html"
    })
    

    $("#oceni").click(function(){
        let k = localStorage.getItem("korisnik");
        let recept = localStorage.getItem("recept");
        //let naslov = recept.split("@")[1];
        let ocena = parseInt($("#ocenaVrednost").val());
        
        let komentar = {"korisnik" : k ,"naslov" : recept, "ocena" : ocena};
        let niz = JSON.parse(localStorage.getItem("ocene")) || [];
        let fl = false;
        for (let i = 0; i < niz.length; i++) {
            let oce = niz[i];
            
            if(recept == oce.naslov && oce.korisnik == k){
                alert("Vec ste uneli ocenu za ovaj recept");
                fl = true;
                break;
            }
        }
        if (!fl){
            let nizPonuda = JSON.parse(localStorage.getItem("ponude")) || [];

            let noviNiz = [];
            let naslovRecepta =  recept.split("@")[1];
            let korisnikKojiJePostavioRecept =  recept.split("@")[0];
            for (let i = 0; i < nizPonuda.length; i++) {
                var ponuda = nizPonuda[i];
                if (ponuda.naslov == naslovRecepta && ponuda.korisnik == korisnikKojiJePostavioRecept){
                    
                    let suma = parseInt(ponuda.sumaOcena) + ocena;
                    let broj  = parseInt(ponuda.brojOcena) +1;
                    let prosek = suma / broj;
                    ponuda.brojOcena = broj;
                    ponuda.sumaOcena = suma;
                    ponuda.ocena = prosek;
                    
                    noviNiz.push(ponuda);

                }
                else{
                    noviNiz.push(ponuda);
                }
            }
            niz.push(komentar);
            localStorage.setItem("ocene", JSON.stringify(niz));
            localStorage.setItem("ponude", JSON.stringify(noviNiz));
            window.location.href = "receptEngleski.html"
        }
        
    })

    $(".skini").click(function(){
        var doc = new jsPDF()
        let res = dobarRecept.priprema.replace(/ć/g ,"c");
        
        let res1 = res.replace(/š/g ,"s");
        let res2 = res1.replace(/č/g,"c");
        let res3 = res2.replace(/ž/g ,"z");
        let res4 = res3.replace(/đ/g ,"dj"); 
        doc.text(doc.splitTextToSize(res4,170),10,10);
        
        doc.save('recept.pdf');
        
    })
})