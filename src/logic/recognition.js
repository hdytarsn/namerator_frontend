import {store} from '../../src/store/store'

class recognition {
    constructor(options) {
        let {lang} = options;
        this.speechLang = lang;
        this.diagnosis = null;
    }

    createSpeechElement() {
        let recognition = new webkitSpeechRecognition();
        recognition.lang = this.speechLang;
        return recognition;
    }

    startListen() {
        let speechElement = this.createSpeechElement();
        speechElement.start();
        this.listenSpeechEvents(speechElement);
    }

    listenSpeechEvents(speechElement) {
        speechElement.onresult = (result) => {
            this.setResult(result);
        };
        speechElement.onnomatch = function () {
            console.log("Speech not recognized");
        };
        speechElement.onaudiostart = () => {
            this.changeSpeechState("Konuşmanız Bekleniyor");
        };
        speechElement.onsoundstart = () => {
            this.changeSpeechState("Dinleniyor");
        };
        speechElement.onsoundend = () => {
            this.changeSpeechState("Sessiz Kaldınız");
        };
        speechElement.onend = () => {
            this.diagnosis
                ? this.changeSpeechState("Tamamlandı")
                : this.changeSpeechState(
                "Anlaşılmadı!"
                );
        };
    }

    changeSpeechState(state) {
        store.commit('setSpeechData', {'currentState': state, 'diagnosis': this.diagnosis})
    }

    setResult(result) {
        this.diagnosis = result.results[0][0].transcript;
    }

}

export default recognition;
