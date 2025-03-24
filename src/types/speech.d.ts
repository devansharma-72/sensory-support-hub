declare interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
  }
  
  declare interface SpeechRecognition extends EventTarget {
    new(): SpeechRecognition;
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: Event) => void;
    start: () => void;
    stop: () => void;
  }
  
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }