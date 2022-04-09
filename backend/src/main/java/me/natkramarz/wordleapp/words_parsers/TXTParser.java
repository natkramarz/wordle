package me.natkramarz.wordleapp.words_parsers;

import me.natkramarz.wordleapp.WordleAppApplication;
import me.natkramarz.wordleapp.model.Word;
import me.natkramarz.wordleapp.repository.WordRepository;
import me.natkramarz.wordleapp.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

public class TXTParser {

    WordService service;

    public TXTParser(WordService service) {
        this.service = service;
    }

    public void parseWords() {
        Stream<String> lines = new BufferedReader(new InputStreamReader(TXTParser.class.getClassLoader().getResourceAsStream("words.txt"))).lines();
        List<Word> words = lines.map(Word::new).collect(Collectors.toList());
        Collections.shuffle(words);
        service.saveAll(words);
        lines.close();
    }

}
