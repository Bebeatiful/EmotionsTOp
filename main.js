classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tctNR_D62/model.json',modelLoaded);

var previsao1 = ""
var previsao2 = ""

Webcam.set({
    width: 350, 
    height: 300,
    imageFormat: "png",
    pngQuality: 90,
})
camera = document.getElementById("camera")
Webcam.attach("#camera")

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'captured_image' src = '"+data_uri+"'/>" 
    })
}

function modelLoaded(){
    console.log("modelo carregado")
}

function speak(){
    var synth = window.speechSynthesis
    speakdata1 = "A primeira previsão é" + previsao1 
    speakdata2 = "A seugunda previsão é" + previsao2
    var utterthis = new SpeechSynthesisUtterance(speakdata1 + speakdata2)
    synth.speak(utterthis)
}

function check(){
    img = document.getElementById("captured_image")
    classifier.classify(img, gotResult)
}

function gotResult(error, results){
    if (error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("resultEmotionName").innerHTML = results[0].label
        document.getElementById("resultEmotionName2").innerHTML = results[1].label
        previsao1 = results[0].label
        previsao2 = results[1].label
        speak()
        if(results[0].label == "Feliz"){
            document.getElementById("uptadeEmoji").innerHTML = "&#128522;";
        }
        if(results[0].label == "Triste"){
            document.getElementById("uptadeEmoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "Irritado"){
            document.getElementById("uptadeEmoji").innerHTML = "&#128548;";
        }
        if(results[1].label == "Feliz"){
            document.getElementById("uptadeEmoji2").innerHTML = "&#128522;";
        }
        if(results[1].label == "Triste"){
            document.getElementById("uptadeEmoji2").innerHTML = "&#128532;";
        }
        if(results[1].label == "Irritado"){
            document.getElementById("uptadeEmoji2").innerHTML = "&#128548;";
        }
    }
}

