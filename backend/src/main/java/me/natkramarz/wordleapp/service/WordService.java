package me.natkramarz.wordleapp.service;


import me.natkramarz.wordleapp.model.Word;
import me.natkramarz.wordleapp.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class WordService {

    WordRepository repository;

    @Autowired
    public WordService(WordRepository repository) {
        this.repository = repository;
    }

    public Set<String> allWords() {
        return repository.findAll().stream()
                .map(Word::getWord)
                .collect(Collectors.toSet());
    }

    public Word getUnusedWord() {
        Word word = repository.findFirstByUsedFalse();
        word.setUsed(true);
        repository.save(word);
        return word;
    }

    public Word addWord(String word) {
        if (word.length() != 5) throw new IllegalArgumentException();
        Word newWord = new Word(word);
        return repository.save(newWord);
    }

    public void saveAll(List<Word> words) {
        repository.saveAll(words);
    }


}
