import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { bannerAPI, coursesAPI, footerAPI } from '../services/api';
import api from '../services/api';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: 'banner' | 'course' | 'curriculum' | 'hero' | 'stats' | 'testimonials' | 'community' | 'ecosystem' | 'mentorship' | 'footer' | null;
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
      console.log('💾 Saving', itemType, 'data...');
      
      if (itemType === 'banner') {
        await bannerAPI.update(formData);
      } else if (itemType === 'course') {
        if (formData._id) {
          await coursesAPI.update(formData._id, formData);
        } else {
          await coursesAPI.create(formData);
        }
      } else if (itemType === 'hero') {
        await api.put('/hero', formData);
      } else if (itemType === 'stats') {
        await api.put('/stats', formData);
      } else if (itemType === 'ecosystem') {
        await api.put('/ecosystem', formData);
      } else if (itemType === 'testimonials') {
        await api.put('/testimonials', formData);
      } else if (itemType === 'community') {
        await api.put('/community', formData);
      } else if (itemType === 'mentorship') {
        await api.put('/mentorship', formData);
      } else if (itemType === 'footer') {
        await footerAPI.update(formData);
      }
      
      console.log('✅ Saved successfully!');
      setEditingItem(null);
      onClose();
      // Reload to get fresh data from database
      setTimeout(() => window.location.reload(), 300);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to save';
      console.error('❌ Save error:', errorMsg, error);
      alert('Failed to save. Error: ' + errorMsg);
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

      case 'hero':
        return (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Main Headline
              </label>
              <textarea
                value={formData.headline || ''}
                onChange={(e) => handleChange('headline', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Highlighted Text
              </label>
              <input
                type="text"
                value={formData.highlightedText || ''}
                onChange={(e) => handleChange('highlightedText', e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Subheadline
              </label>
              <textarea
                value={formData.subheadline || ''}
                onChange={(e) => handleChange('subheadline', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Active Learners Value
              </label>
              <input
                type="number"
                value={formData.activeLearnersValue || 500}
                onChange={(e) => handleChange('activeLearnersValue', parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Completion Rate %
              </label>
              <input
                type="number"
                value={formData.completionRate || 98}
                onChange={(e) => handleChange('completionRate', parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Avg ROI Improvement
              </label>
              <input
                type="number"
                value={formData.avgROI || 14}
                onChange={(e) => handleChange('avgROI', parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Average Rating
              </label>
              <input
                type="text"
                value={formData.averageRating || '4.9'}
                onChange={(e) => handleChange('averageRating', e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Testimonials Intro Text
              </label>
              <textarea
                value={formData.introText || ''}
                onChange={(e) => handleChange('introText', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        );

      case 'community':
        return (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Section Title
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
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Discord Link
              </label>
              <input
                type="text"
                value={formData.discordLink || ''}
                onChange={(e) => handleChange('discordLink', e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Referral Code
              </label>
              <input
                type="text"
                value={formData.referralCode || ''}
                onChange={(e) => handleChange('referralCode', e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        );

      case 'ecosystem':
        return (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Section Title
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
                Subtitle
              </label>
              <textarea
                value={formData.subtitle || ''}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        );

      case 'mentorship':
        return (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Section Title
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
                Price
              </label>
              <input
                type="text"
                value={formData.price || ''}
                onChange={(e) => handleChange('price', e.target.value)}
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
                rows={3}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Copyright Text
              </label>
              <input
                type="text"
                value={formData.copyrightText || ''}
                onChange={(e) => handleChange('copyrightText', e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Disclaimer Text
              </label>
              <textarea
                value={formData.disclaimerText || ''}
                onChange={(e) => handleChange('disclaimerText', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-violet-500"
              />
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
                type="button"
                onClick={onClose}
                className="text-zinc-400 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {renderFormFields()}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-600 px-4 py-2 rounded-md text-white font-semibold transition"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
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
