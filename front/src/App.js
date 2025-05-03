import React from 'react';
import axios from 'axios';
const { useState, useEffect } = React;

export default function GpuRecommendationForm() {
      const [form, setForm] = useState({
        modelType: '',
        datasetSize: '',
        mode: '',
        budget: '',
        multiGPU: false,
        region: ''
      });
      const [recommendations, setRecommendations] = useState([]);
      const [loading, setLoading] = useState(false);
      const [errors, setErrors] = useState({});

      const validateForm = () => {
        const newErrors = {};
        if (!form.modelType) newErrors.modelType = 'Model type is required';
        if (!form.datasetSize || isNaN(form.datasetSize) || form.datasetSize <= 0) {
          newErrors.datasetSize = 'Enter a valid dataset size in GB';
        }
        if (!form.mode) newErrors.mode = 'Mode is required';
        if (!form.budget || isNaN(form.budget) || form.budget <= 0) {
          newErrors.budget = 'Enter a valid budget in INR';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
      };

      const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
          const res = await axios.post('http://localhost:5000/api/recommend', form);
          setRecommendations(res.data);
        } catch (error) {
          console.error('Error fetching recommendations:', error);
          setErrors({ submit: 'Failed to fetch recommendations. Please try again.' });
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg transform transition-all duration-300 hover:shadow-2xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">GPU Recommendation Tool</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">AI/ML Model Type</label>
                <select
                  name="modelType"
                  value={form.modelType}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.modelType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Model Type</option>
                  <option value="nlp">Large NLP Models</option>
                  <option value="image">Image Models</option>
                  <option value="gan">GANs / Diffusion Models</option>
                  <option value="tabular">Tabular Models</option>
                  <option value="rl">Reinforcement Learning</option>
                  <option value="inference">Inference APIs</option>
                  <option value="fine_tune">Fine-tuning Small Models</option>
                </select>
                {errors.modelType && <p className="text-red-500 text-xs mt-1">{errors.modelType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dataset Size (GB)</label>
                <input
                  type="number"
                  name="datasetSize"
                  placeholder="e.g., 10"
                  value={form.datasetSize}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.datasetSize ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.datasetSize && <p className="text-red-500 text-xs mt-1">{errors.datasetSize}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                <select
                  name="mode"
                  value={form.mode}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.mode ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Mode</option>
                  <option value="training">Training</option>
                  <option value="inference">Inference</option>
                </select>
                {errors.mode && <p className="text-red-500 text-xs mt-1">{errors.mode}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (INR)</label>
                <input
                  type="number"
                  name="budget"
                  placeholder="e.g., 5000"
                  value={form.budget}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.budget ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="multiGPU"
                  checked={form.multiGPU}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Multi-GPU Required</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Region</label>
                <input
                  type="text"
                  name="region"
                  placeholder="e.g., Mumbai"
                  value={form.region}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
                  loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'Get Recommendations'
                )}
              </button>
            </form>

            {recommendations.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Recommendations</h2>
                <div className="space-y-4">
                  {recommendations.map((gpu, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <h3 className="font-semibold text-gray-800">{gpu.gpu_description}</h3>
                      <p className="text-sm text-gray-600">
                        ₹{gpu.price_per_hour}/hr • {gpu.ram}GB RAM • {gpu.vcpus} vCPUs
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }


