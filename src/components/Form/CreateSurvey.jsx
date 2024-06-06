import { useState } from 'react';



const CreateSurvey = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [option, setOption] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');
  
    const categories = [
      'Customer Satisfaction',
      'Employee Feedback',
      'Market Research',
      'Product Feedback',
      'Event Planning'
    ];
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const surveyData = {
        title,
        description,
        option: option === 'yes' ? true : false,
        category,
        deadline,
        status: 'publish', // default status
        timestamp: new Date().toISOString()
      };
  
      console.log('Survey Data:', surveyData);
  
      // Send surveyData to your backend here



    };
    return (
        <div className="max-w-md mx-auto p-4 block ">
          <h2 className="text-2xl font-bold mb-4">Create Survey</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium">Option</label>
              <div className="flex space-x-4 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="yes"
                    checked={option === 'yes'}
                    onChange={(e) => setOption(e.target.value)}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={option === 'no'}
                    onChange={(e) => setOption(e.target.value)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg border-0 hover:bg-green-600"
            >
              Create Survey
            </button>
          </form>
        </div>
      );
    };

export default CreateSurvey;