import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { bannerAPI, coursesAPI } from '../services/api';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: 'banner' | 'course' | 'curriculum' | 'section' | null;
  itemData: any;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  itemType,
  itemData,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { setEditingItem } = useAdmin();

  useEffect(() => {
    if (itemData) {
      setFormData(itemData);
    }
  }, [itemData, isOpen]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (itemType === 'banner') {
        await bannerAPI.update(formData);
      } else if (itemType === 'course') {
        if (formData._id) {
          await coursesAPI.update(formData._id, formData);
        } else {
          await coursesAPI.create(formData);
        }
      }
      
      setEditingItem(null);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const renderFormFields = () => {
    switch (itemType) {
      case 'banner':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Title Text
              </label>
              <input
                type="text"
                value={formData.text || ''}
                onChange={(e) => handleChange('text', e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Message
              </label>
              <textarea
                value={formData.message || ''}
                onChange={(e) => handleChange('message', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        );

      case 'course':
        return (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  value={formData.price || 0}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Label
                </label>
                <input
                  type="text"
                  value={formData.label || ''}
                  onChange={(e) => handleChange('label', e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g., Popular"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                CTA Button Text
              </label>
              <input
                type="text"
                value={formData.cta || ''}
                onChange={(e) => handleChange('cta', e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
                placeholder="e.g., Get Started"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Highlights (one per line)
              </label>
              <textarea
                value={(formData.highlights || []).join('\n')}
                onChange={(e) => handleChange('highlights', e.target.value.split('\n').filter(h => h.trim()))}
                rows={4}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500 font-mono text-xs"
                placeholder="Enter each highlight on a new line"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.accent || false}
                onChange={(e) => handleChange('accent', e.target.checked)}
                id="accent"
                className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-violet-600 cursor-pointer"
              />
              <label htmlFor="accent" className="text-sm font-medium text-zinc-400 cursor-pointer">
                Mark as Featured Course
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-zinc-900 rounded-lg p-6 w-full max-w-md border border-violet-500/30 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">
                Edit {itemType?.charAt(0).toUpperCase()}{itemType?.slice(1)}
              </h3>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {renderFormFields()}

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-600 px-4 py-2 rounded-md text-white font-semibold transition"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={onClose}
                className="flex-1 border border-zinc-600 hover:bg-zinc-800 px-4 py-2 rounded-md text-white font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
