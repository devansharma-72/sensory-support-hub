import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaBell, FaPlus } from 'react-icons/fa';

interface Reminder {
  id: number;
  title: string;
  description?: string;
  date: string;
  time: string;
  category: string;
  repeat: string;
  priority: string;
}

const ReminderPage: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [formData, setFormData] = useState<Partial<Reminder>>({ priority: "Low", repeat: "Never" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReminder = () => {
    if (!formData.title || !formData.date || !formData.time) {
      alert("Please fill in all required fields.");
      return;
    }

    const newReminder: Reminder = {
      id: Date.now(),
      title: formData.title!,
      description: formData.description || '',
      date: formData.date,
      time: formData.time,
      category: formData.category || "General",
      repeat: formData.repeat!,
      priority: formData.priority!,
    };

    setReminders([...reminders, newReminder]);
    setFormData({ title: '', description: '', date: '', time: '', category: '', repeat: 'Never', priority: 'Low' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-4xl font-bold text-center text-gray-800">Customizable Reminders</h1>
      <p className="text-center text-gray-500">Set personalized reminders for tasks, routines, and self-care activities.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {/* Create Reminder Section */}
        <Card className="p-6">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">📅 Create Reminder</h2>
            
            <input 
              name="title" 
              value={formData.title || ''} 
              onChange={handleChange} 
              placeholder="Enter reminder title"
              className="w-full p-2 mb-4 border rounded"
            />
            
            <input 
              name="description" 
              value={formData.description || ''} 
              onChange={handleChange} 
              placeholder="Enter additional details (optional)" 
              className="w-full p-2 mb-4 border rounded"
            />
            
            <div className="flex gap-4 mb-4">
              <input 
                name="date" 
                type="date" 
                value={formData.date || ''} 
                onChange={handleChange} 
                className="p-2 border rounded"
              />
              
              <input 
                name="time" 
                type="time" 
                value={formData.time || ''} 
                onChange={handleChange} 
                className="p-2 border rounded"
              />
            </div>

            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 mb-4 border rounded">
              <option value="Work">Work</option>
              <option value="Health">Health</option>
              <option value="Personal">Personal</option>
            </select>

            <select name="repeat" value={formData.repeat} onChange={handleChange} className="w-full p-2 mb-4 border rounded">
              <option value="Never">Never</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>

            {/* Priority Selection */}
            <div className="flex gap-4 mb-4">
              {['Low', 'Medium', 'High'].map((level) => (
                <label key={level} className={`cursor-pointer ${formData.priority === level ? 'text-blue-500' : 'text-gray-500'}`}>
                  <input 
                    type="radio" 
                    name="priority" 
                    value={level} 
                    checked={formData.priority === level} 
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>

            {/* Add Reminder Button */}
            <Button onClick={handleAddReminder} className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
              <FaPlus className="inline-block mr-2" /> Add Reminder
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Reminders Section */}  
        <Card className="p-6">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">🔔 Upcoming Reminders</h2>
            {reminders.length === 0 ? (
              <div className="text-center text-gray-500">
                <FaBell className="text-5xl mb-4" />
                No reminders set. Create your first reminder to get started!
              </div>
            ) : (
              <ul>
                {reminders.map((reminder) => (
                  <li key={reminder.id} className="p-4 mb-2 border rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold">{reminder.title}</h3>
                    <p className="text-sm text-gray-500">{reminder.description || 'No description'}</p>
                    <p>{reminder.date} at {reminder.time}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${reminder.priority === 'High' ? 'bg-red-500 text-white' : reminder.priority === 'Medium' ? 'bg-yellow-400 text-white' : 'bg-green-500 text-white'}`}>
                      {reminder.priority} Priority
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReminderPage;
