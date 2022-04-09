package me.natkramarz.wordleapp.repository;

import me.natkramarz.wordleapp.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends JpaRepository<Word, Integer> {
    Word findFirstByUsedFalse();
}
