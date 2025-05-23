import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import WordForm from "../components/WordForm";

const AddWord: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    word: "",
    meaning: "",
    example: "",
    category: "",
  });

  useEffect(() => {
    const wordsRef = ref(db, "words");

    const unsubscribe = onValue(wordsRef, (snapshot) => {
      const firebaseData = snapshot.val();
      const categoriesList = firebaseData ? Object.keys(firebaseData) : [];

      setCategories(categoriesList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setFormData((prev) => ({
        ...prev,
        category: categories[0],
      }));
    }
  }, [categories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wordKey = formData.word;
    const wordRef = ref(db, `words/${formData.category}/${wordKey}`);

    set(wordRef, {
      ...formData,
      id: formData.word,
      category: formData.category,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">
        Add New Word
      </h1>
      <WordForm
        formData={formData}
        categories={categories}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Add Word"
      />
    </div>
  );
};

export default AddWord;
