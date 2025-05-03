import React, { useState } from 'react';
import { fetchRecommendations } from '../api';

const GPUForm = ({ setRecommendations }) => {
  const [form, setForm] = useState({
    useCase: 'AI/ML',
    brand: 'NVIDIA',
    minVram: 8,
    resolution: '1080p',
    rayTracing: false,
    dlss: false,
    budget: 1000,
    psuWattage: 750
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recommendations = await fetchRecommendations(form);
    setRecommendations(recommendations);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <select name="useCase" onChange={handleChange}>
        <option>AI/ML</option><option>Gaming</option><option>3D Rendering</option>
      </select>
      <input type="number" name="minVram" placeholder="Minimum VRAM (GB)" onChange={handleChange} />
      <input type="number" name="budget" placeholder="Budget ($)" onChange={handleChange} />
      <input type="number" name="psuWattage" placeholder="PSU Wattage" onChange={handleChange} />
      <label><input type="checkbox" name="rayTracing" onChange={handleChange} /> Ray Tracing</label>
      <label><input type="checkbox" name="dlss" onChange={handleChange} /> DLSS</label>
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">Get Recommendations</button>
    </form>
  );
};

export default GPUForm;
