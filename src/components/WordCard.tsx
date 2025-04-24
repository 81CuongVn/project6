import React from "react";

interface Word {
  id: string;
  word: string;
  meaning: string;
  example: string;
}

interface WordCardProps {
  word: Word;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{word.word}</h3>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Meaning:</span> {word.meaning}
      </p>
      <p className="text-sm text-gray-600 mt-2">
        <span className="font-semibold">Example:</span> {word.example}
      </p>
    </div>
  );
};

export default WordCard;
