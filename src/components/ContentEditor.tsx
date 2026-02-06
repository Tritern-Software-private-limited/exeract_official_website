import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Layout, List, DollarSign, Info, Type, X } from 'lucide-react';
import { content, type ContentType, INITIAL_CONTENT } from '../utils/content';
import { SectionLoader } from './SectionLoader';
import { auth } from '../utils/auth';
type ContentTab = 'hero' | 'howItWorks' | 'features' | 'pricing' | 'footer';
interface ContentEditorProps {
  initialTab?: ContentTab;
  onClose?: () => void;
}
export function ContentEditor({ initialTab, onClose }: ContentEditorProps) {
  const [data, setData] = useState<ContentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ContentTab>(initialTab || 'hero');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const next = await content.getContent();
        if (!active) return;
        setData(next);
        setError(null);
      } catch (err) {
        if (!active) return;
        setError('Failed to load content');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);
  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      await content.saveContent(data, auth.getToken() || undefined);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };
  const updateField = (
  section: keyof ContentType,
  field: string,
  value: any) =>
  {
    setData((prev) => ({
      ...(prev || INITIAL_CONTENT),
      [section]: {
        ...(prev ? prev[section] : INITIAL_CONTENT[section]),
        [field]: value
      }
    }));
  };
  const updateArrayItem = (
  section: keyof ContentType,
  arrayName: string,
  index: number,
  field: string | null,
  value: any) =>
  {
    setData((prev) => {
      const safePrev = prev || INITIAL_CONTENT;
      const newSection = {
        ...safePrev[section]
      };
      const newArray = [...(newSection as any)[arrayName]];
      if (field) {
        newArray[index] = {
          ...newArray[index],
          [field]: value
        };
      } else {
        newArray[index] = value;
      }
      ;(newSection as any)[arrayName] = newArray;
      return {
        ...safePrev,
        [section]: newSection
      };
    });
  };
  const tabs = [
  {
    id: 'hero',
    label: 'Hero Section',
    icon: Layout
  },
  {
    id: 'howItWorks',
    label: 'How It Works',
    icon: List
  },
  {
    id: 'features',
    label: 'Features',
    icon: Info
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: DollarSign
  },
  {
    id: 'footer',
    label: 'Footer',
    icon: Type
  }];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <SectionLoader label="Loading content editor" minHeightClassName="min-h-[240px]" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <div className="text-center text-sm text-gray-500">
          Unable to load content editor.
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {onClose &&
      <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">Edit Page Content</h2>
          <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors">

            <X size={20} />
          </button>
        </div>
      }
      <div className="border-b border-gray-100 bg-gray-50 overflow-x-auto">
        <div className="flex">
          {tabs.map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-4 flex items-center whitespace-nowrap text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-white text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>

              <tab.icon size={16} className="mr-2" />
              {tab.label}
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'hero' &&
        <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Badge Text
              </label>
              <input
              type="text"
              value={data.hero.badge}
              onChange={(e) => updateField('hero', 'badge', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Headline
              </label>
              <input
              type="text"
              value={data.hero.headline}
              onChange={(e) =>
              updateField('hero', 'headline', e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none font-bold transition-all" />

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subheadline
              </label>
              <textarea
              value={data.hero.subheadline}
              onChange={(e) =>
              updateField('hero', 'subheadline', e.target.value)
              }
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none" />

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary CTA
                </label>
                <input
                type="text"
                value={data.hero.primaryCta}
                onChange={(e) =>
                updateField('hero', 'primaryCta', e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary CTA
                </label>
                <input
                type="text"
                value={data.hero.secondaryCta}
                onChange={(e) =>
                updateField('hero', 'secondaryCta', e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trust Badges
              </label>
              <div className="space-y-2">
                {data.hero.trustBadges.map((badge, idx) =>
              <input
                key={idx}
                type="text"
                value={badge}
                onChange={(e) =>
                updateArrayItem(
                  'hero',
                  'trustBadges',
                  idx,
                  null,
                  e.target.value
                )
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

              )}
              </div>
            </div>
          </div>
        }

        {activeTab === 'howItWorks' &&
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Title
                </label>
                <input
                type="text"
                value={data.howItWorks.sectionTitle}
                onChange={(e) =>
                updateField('howItWorks', 'sectionTitle', e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Heading
                </label>
                <input
                type="text"
                value={data.howItWorks.heading}
                onChange={(e) =>
                updateField('howItWorks', 'heading', e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none font-bold transition-all" />

              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
              value={data.howItWorks.description}
              onChange={(e) =>
              updateField('howItWorks', 'description', e.target.value)
              }
              rows={2}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none" />

            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="font-bold text-navy">Steps</h3>
              {data.howItWorks.steps.map((step, idx) =>
            <div
              key={idx}
              className="p-4 bg-gray-50 rounded-lg border border-gray-100">

                  <div className="mb-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Step {idx + 1} Title
                    </label>
                    <input
                  type="text"
                  value={step.title}
                  onChange={(e) =>
                  updateArrayItem(
                    'howItWorks',
                    'steps',
                    idx,
                    'title',
                    e.target.value
                  )
                  }
                  className="w-full px-3 py-2 rounded border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Description
                    </label>
                    <textarea
                  value={step.description}
                  onChange={(e) =>
                  updateArrayItem(
                    'howItWorks',
                    'steps',
                    idx,
                    'description',
                    e.target.value
                  )
                  }
                  rows={2}
                  className="w-full px-3 py-2 rounded border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none" />

                  </div>
                </div>
            )}
            </div>
          </div>
        }

        {activeTab === 'features' &&
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Title
                </label>
                <input
                type="text"
                value={data.features.sectionTitle}
                onChange={(e) =>
                updateField('features', 'sectionTitle', e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Heading
                </label>
                <input
                type="text"
                value={data.features.heading}
                onChange={(e) =>
                updateField('features', 'heading', e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none font-bold transition-all" />

              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
              value={data.features.description}
              onChange={(e) =>
              updateField('features', 'description', e.target.value)
              }
              rows={2}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none" />

            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="font-bold text-navy">Feature Cards</h3>
              {data.features.features.map((feature, idx) =>
            <div
              key={idx}
              className="p-4 bg-gray-50 rounded-lg border border-gray-100">

                  <div className="mb-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Feature {idx + 1} Title
                    </label>
                    <input
                  type="text"
                  value={feature.title}
                  onChange={(e) =>
                  updateArrayItem(
                    'features',
                    'features',
                    idx,
                    'title',
                    e.target.value
                  )
                  }
                  className="w-full px-3 py-2 rounded border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Description
                    </label>
                    <textarea
                  value={feature.description}
                  onChange={(e) =>
                  updateArrayItem(
                    'features',
                    'features',
                    idx,
                    'description',
                    e.target.value
                  )
                  }
                  rows={2}
                  className="w-full px-3 py-2 rounded border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none" />

                  </div>
                </div>
            )}
            </div>
          </div>
        }

        {activeTab === 'pricing' &&
        <div className="space-y-6">
            <div className="space-y-6">
              {data.pricing.plans.map((plan, idx) =>
            <div
              key={idx}
              className="p-6 bg-gray-50 rounded-xl border border-gray-100">

                  <h3 className="font-bold text-navy mb-4 border-b border-gray-200 pb-2">
                    {plan.name} Plan
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Price
                      </label>
                      <input
                    type="text"
                    value={plan.price}
                    onChange={(e) =>
                    updateArrayItem(
                      'pricing',
                      'plans',
                      idx,
                      'price',
                      e.target.value
                    )
                    }
                    className="w-full px-3 py-2 rounded border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Period
                      </label>
                      <input
                    type="text"
                    value={plan.period}
                    onChange={(e) =>
                    updateArrayItem(
                      'pricing',
                      'plans',
                      idx,
                      'period',
                      e.target.value
                    )
                    }
                    className="w-full px-3 py-2 rounded border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Description
                    </label>
                    <input
                  type="text"
                  value={plan.description}
                  onChange={(e) =>
                  updateArrayItem(
                    'pricing',
                    'plans',
                    idx,
                    'description',
                    e.target.value
                  )
                  }
                  className="w-full px-3 py-2 rounded border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Features (one per line)
                    </label>
                    <textarea
                  value={plan.features.join('\n')}
                  onChange={(e) => {
                    const features = e.target.value.split('\n');
                    updateArrayItem(
                      'pricing',
                      'plans',
                      idx,
                      'features',
                      features
                    );
                  }}
                  rows={5}
                  className="w-full px-3 py-2 rounded border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none font-mono text-sm transition-all resize-none" />

                  </div>
                </div>
            )}
            </div>
          </div>
        }

        {activeTab === 'footer' &&
        <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Description
              </label>
              <textarea
              value={data.footer.description}
              onChange={(e) =>
              updateField('footer', 'description', e.target.value)
              }
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none" />

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Support Email
              </label>
              <input
              type="text"
              value={data.footer.email}
              onChange={(e) => updateField('footer', 'email', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

            </div>
          </div>
        }

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
          {showSuccess &&
          <span className="text-green-600 font-medium text-sm animate-fade-in">
              Changes saved successfully!
            </span>
          }
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center disabled:opacity-70">

            {isSaving ?
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> :

            <Save size={18} className="mr-2" />
            }
            Save Changes
          </button>
        </div>
      </div>
    </div>);

}
