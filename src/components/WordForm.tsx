import React from "react";

interface WordFormProps {
  formData: {
    word: string;
    meaning: string;
    example: string;
    category: string;
  };
  categories: string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  onDelete?: () => void;
}

const WordForm: React.FC<WordFormProps> = ({
  formData,
  categories,
  onChange,
  onSubmit,
  submitLabel = "Save",
  onDelete,
}) => (
  <form
    onSubmit={onSubmit}
    className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
  >
    <div className="mb-4">
      <label
        htmlFor="word"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Word
      </label>
      <input
        type="text"
        id="word"
        name="word"
        value={formData.word}
        onChange={onChange}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="meaning"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Meaning
      </label>
      <input
        type="text"
        id="meaning"
        name="meaning"
        value={formData.meaning}
        onChange={onChange}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="example"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Example
      </label>
      <input
        type="text"
        id="example"
        name="example"
        value={formData.example}
        onChange={onChange}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Category
      </label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={onChange}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        required
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
    <div className="flex gap-4 mt-6">
      <button
        type="submit"
        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition duration-300"
      >
        {submitLabel}
      </button>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 transition duration-300"
        >
          Delete
        </button>
      )}
    </div>
  </form>
);

export default WordForm;
