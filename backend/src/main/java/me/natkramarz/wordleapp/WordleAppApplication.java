package me.natkramarz.wordleapp;

import me.natkramarz.wordleapp.words_parsers.TXTParser;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WordleAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(WordleAppApplication.class, args);
	}

}
