    'use client';

    import React, { useState, useRef, useEffect } from 'react';
    import { motion } from 'framer-motion';

    interface TabSelectionProps {
    activeTab: 'individuals' | 'groups';
    onTabChange: (tab: 'individuals' | 'groups') => void;
    }

    export function TabSelection({ activeTab, onTabChange }: TabSelectionProps) {
    const [underlineWidth, setUnderlineWidth] = useState(0);
    const [underlineLeft, setUnderlineLeft] = useState(0);
    const individualsRef = useRef<HTMLButtonElement>(null);
    const groupsRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const activeRef = activeTab === 'individuals' ? individualsRef : groupsRef;
        if (activeRef.current) {
        setUnderlineWidth(activeRef.current.offsetWidth);
        setUnderlineLeft(activeRef.current.offsetLeft);
        }
    }, [activeTab]);

    return (
        <div className="border-b border-gray-200 relative">
        <div className="flex gap-8 relative">
            <button
            ref={individualsRef}
            onClick={() => onTabChange('individuals')}
            className={`py-3 px-1 text-sm font-medium transition-colors ${
                activeTab === 'individuals'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            >
            Individuals
            </button>
            <button
            ref={groupsRef}
            onClick={() => onTabChange('groups')}
            className={`py-3 px-1 text-sm font-medium transition-colors ${
                activeTab === 'groups'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            >
            Groups
            </button>

            <motion.div
            className="absolute bottom-0 h-0.5 bg-blue-600"
            initial={false}
            animate={{
                width: underlineWidth,
                left: underlineLeft,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
            }}
            />
        </div>
        </div>
    );
    }
