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
            $("#recept").append('<div class="card-header">' +naslov+'</div><div class="card-body"><video width="100%"  controls><source src="'+konacanVideo+'" type=video/mp4 ></video><br><p class="card-text">'+priprema + '</p><br><p>Tezina: '+ tezina+'</p><br><p>Trajanje: '+trajanje+'min</p><p>Prosecna ocena: '+ocena.toFixed(2) +'</p><img class="d-block w-100" src="'+konacnaSlika+'" alt="First slide"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><span class="glyphicon glyphicon-comment"></span>┬áKomentari<br></h3></div><div class="panel-body"><ul class="media-list komentari"></ul><div class="form-group"><label for="exampleFormControlTextarea1">Komentarisi</label><textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div><div style="display: flex; justify-content: space-around;"><button type="button" class="btn btn-primary komentarisi">Komentarisi</button><select class="form-select" aria-label="Default select example" id ="ocenaVrednost"><option value="1">Lose - 1</option><option value="2">Slabo - 2</option><option value="3">Dobro - 3</option><option value="4">Vrlo dobro - 4</option><option value="5">Odlicno  - 5</option></select><button type="button" class="btn btn-primary" id = "oceni">Oceni</button><button type="button" class="btn btn-primary skini">Skini pdf</button></div></div></div></div>');

//<a href="slikeRecepata/punjenepaprike.txt" download></a>
            let kateg;
            if (element.kategorija == "Predjelo"){
                kateg= "predjela.html"
            }
            if (element.kategorija == "Glavno jelo"){
                kateg= "glavnajela.html"
            }
            if (element.kategorija == "Desert"){
                kateg= "deserti.html"
            }
            if (element.kategorija == "Uzina"){
                kateg= "uzine.html"
            }
            $("#putokaz").append('<li class="breadcrumb-item"><a href="">Recepti</a></li><li class="breadcrumb-item"><a href="'+kateg+'">'+element.kategorija+'</a></li><li class="breadcrumb-item active" aria-current="page">'+element.naslov+'</li>');
            
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
        window.location.href = "recept.html"
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
                    //let korisnik = {"korisnik" : ponuda.korisnik ,"naslov" : ponuda.naslov, "kategorija" : ponuda.kategorija, "tezina" : ponuda.tezina , "priprema": ponuda.priprema, "trajanje": ponuda.trajanje, "video": ponuda.video , "slika": ponuda.slike , "ocena" : prosek, "sumaOcena" :suma, "brojOcena" :broj , "komentari" : []};
                    noviNiz.push(ponuda);

                }
                else{
                    noviNiz.push(ponuda);
                }
            }
            niz.push(komentar);
            localStorage.setItem("ocene", JSON.stringify(niz));
            localStorage.setItem("ponude", JSON.stringify(noviNiz));
            window.location.href = "recept.html"
        }
        
    })

    $(".skini").click(function(){
        var doc = new jsPDF()
        let res = dobarRecept.priprema.replace(/─ç/g ,"c");
        
        let res1 = res.replace(/┼í/g ,"s");
        let res2 = res1.replace(/─Ź/g,"c");
        let res3 = res2.replace(/┼ż/g ,"z");
        let res4 = res3.replace(/─Ĺ/g ,"dj"); 
        doc.text(doc.splitTextToSize(res4,170),10,10);
        
        doc.save('recept.pdf');
        
    })
})