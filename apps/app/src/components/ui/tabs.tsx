import { Tab } from '@/types/tabs';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface TabsProps<T> {
  tabs: Tab<T>[];
  activeTab?: Tab<T>;
  onChange?: (id: T) => void;
}

export function Tabs<T>({ tabs, activeTab, onChange }: TabsProps<T>) {
  const [activeTabId, setActiveTabId] = useState<T>(() => (activeTab ? activeTab.id : tabs[0].id));

  return (
    <div className="border-b">
      <div className="relative flex flex-row gap-3">
        {tabs.map(({ id, label }) => (
          <button
            key={id + ''}
            onClick={() => {
              onChange && onChange(id);
              setActiveTabId(id);
            }}
            className="text-md data-[active=true]:text-primary text-muted-foreground relative px-1 pb-3 text-sm font-medium"
            data-active={id === activeTabId}
          >
            {label}
            {id === activeTabId && (
              <motion.div
                layoutId="activeTabIndicator"
                className="bg-primary absolute bottom-0 left-0 right-0 h-0.5"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
