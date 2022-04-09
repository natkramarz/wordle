package me.natkramarz.wordleapp.controller;


import me.natkramarz.wordleapp.controller.request.WordRequest;
import me.natkramarz.wordleapp.service.WordService;
import me.natkramarz.wordleapp.words_parsers.TXTParser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/wordle")
@CrossOrigin(origins = {"http://localhost:3000/"})
public class WordController {

    WordService service;

    public WordController(WordService service) {
        this.service = service;
    }

    @PostMapping(path = "add_list")
    public ResponseEntity<?> readWordList() {
        TXTParser parser = new TXTParser(service);
        parser.parseWords();
        return ResponseEntity.ok(service.allWords());
    }

    @GetMapping()
    public ResponseEntity<?> getWord() {
        return ResponseEntity.ok(service.getUnusedWord());
    }


    @PostMapping(path = "add")
    public ResponseEntity<?> addWord(@RequestBody WordRequest wordRequest) {
        return ResponseEntity.ok(service.addWord(wordRequest.word()));
    }

    /*
    @GetMapping(path="all")
    public ResponseEntity<?> allWords() {
        return ResponseEntity.ok(service.allWords());
    }
    */
}
