import React from "react";
import { Word } from "../pages/WordList";
import { useNavigate } from "react-router-dom";

interface WordCardProps {
  word: Word;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/edit-word/${word.category}/${word.word}`);
  };
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
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
