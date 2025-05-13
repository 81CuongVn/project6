import React, { useEffect, useState } from "react";
import WordForm from "../components/WordForm";
import { onValue, ref, set } from "firebase/database";
import { db } from "../firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";

const EditWord: React.FC = () => {
  const { word, category } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
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
    if (category && word) {
      const wordRef = ref(db, `words/${category}/${word}`);
      const unsubscribe = onValue(wordRef, (snapshot) => {
        const wordData = snapshot.val();
        if (wordData) {
          setFormData({
            word: wordData.word,
            meaning: wordData.meaning,
            example: wordData.example,
            category,
          });
        }
      });

      return () => unsubscribe();
    }
  }, [category, word]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (category !== formData.category || word !== formData.word) {
      // Xóa bản ghi cũ
      set(ref(db, `words/${category}/${word}`), null);
    }

    set(ref(db, `words/${formData.category}/${formData.word}`), {
      ...formData,
      id: formData.word,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = () => {
    if (category && word) {
      set(ref(db, `words/${category}/${word}`), null)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">
        Edit Word
      </h1>
      <WordForm
        formData={formData}
        categories={categories}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EditWord;
