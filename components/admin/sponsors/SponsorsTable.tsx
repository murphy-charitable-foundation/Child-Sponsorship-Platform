'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Sponsor {
  id: string;
  firstName: string;
  lastName: string;
  sponsorId: string;
  location: string;
  status: 'Active' | 'Inactive';
  childrenCount: number;
}

interface SponsorGroup {
  id: string;
  groupName: string;
  type: string;
  groupId: string;
  location: string;
  status: 'Active' | 'Inactive';
  childrenCount: number;
}

const SPONSORS_DATA: Sponsor[] = [
  {
    id: '1',
    firstName: 'Carlos',
    lastName: 'Martinez',
    sponsorId: 'SI24-0008',
    location: 'USA',
    status: 'Active',
    childrenCount: 2,
  },
  {
    id: '2',
    firstName: 'Michelle',
    lastName: 'Smith',
    sponsorId: 'SI23-0012',
    location: 'USA',
    status: 'Active',
    childrenCount: 1,
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Brown',
    sponsorId: 'SI24-0003',
    location: 'UK',
    status: 'Active',
    childrenCount: 2,
  },
  {
    id: '4',
    firstName: 'Robert',
    lastName: 'Davis',
    sponsorId: 'SI22-0089',
    location: 'USA',
    status: 'Inactive',
    childrenCount: 0,
  },
  {
    id: '5',
    firstName: 'Jennifer',
    lastName: 'Wilson',
    sponsorId: 'SI23-0045',
    location: 'Australia',
    status: 'Active',
    childrenCount: 2,
  },
  {
    id: '6',
    firstName: 'Carlos',
    lastName: 'Martinez',
    sponsorId: 'SI24-0008',
    location: 'Spain',
    status: 'Active',
    childrenCount: 2,
  },
  {
    id: '7',
    firstName: 'Lisa',
    lastName: 'Anderson',
    sponsorId: 'SI23-0067',
    location: 'USA',
    status: 'Active',
    childrenCount: 1,
  },
  {
    id: '8',
    firstName: 'David',
    lastName: 'Taylor',
    sponsorId: 'SI23-0023',
    location: 'Canada',
    status: 'Inactive',
    childrenCount: 0,
  },
  {
    id: '9',
    firstName: 'Amanda',
    lastName: 'Thomas',
    sponsorId: 'SI24-0015',
    location: 'USA',
    status: 'Active',
    childrenCount: 1,
  },
  {
    id: '10',
    firstName: 'Jose',
    lastName: 'Garcia',
    sponsorId: 'SI22-0134',
    location: 'Spain',
    status: 'Active',
    childrenCount: 2,
  },
];

const GROUPS_DATA: SponsorGroup[] = [
  {
    id: '1',
    groupName: 'Business Leaders Alliance',
    type: 'Company',
    groupId: 'SG21-0089',
    location: 'USA',
    status: 'Inactive',
    childrenCount: 0,
  },
  {
    id: '2',
    groupName: 'Community Foundation',
    type: 'Organization',
    groupId: 'SG22-0045',
    location: 'Canada',
    status: 'Active',
    childrenCount: 10,
  },
  {
    id: '3',
    groupName: 'Grace Fellowship',
    type: 'Religious',
    groupId: 'SG23-0067',
    location: 'Australia',
    status: 'Active',
    childrenCount: 5,
  },
  {
    id: '4',
    groupName: 'Hope Charity Collective',
    type: 'Organization',
    groupId: 'SG23-0012',
    location: 'UK',
    status: 'Active',
    childrenCount: 20,
  },
  {
    id: '5',
    groupName: 'Howard & Associates',
    type: 'Company',
    groupId: 'SG23-0034',
    location: 'Canada',
    status: 'Active',
    childrenCount: 10,
  },
  {
    id: '6',
    groupName: 'Rotary Club Downtown',
    type: 'Organization',
    groupId: 'SG24-0003',
    location: 'USA',
    status: 'Active',
    childrenCount: 15,
  },
  {
    id: '7',
    groupName: "St. Mary's Church",
    type: 'Religious',
    groupId: 'SG23-0001',
    location: 'USA',
    status: 'Active',
    childrenCount: 5,
  },
  {
    id: '8',
    groupName: 'Tech for Good',
    type: 'Company',
    groupId: 'SG24-0008',
    location: 'Spain',
    status: 'Active',
    childrenCount: 25,
  },
];

export type { Sponsor, SponsorGroup };

interface SponsorsTableProps {
  activeTab: 'individuals' | 'groups';
  onEdit?: (row: Sponsor | SponsorGroup) => void;
}

export function SponsorsTable({ activeTab, onEdit }: SponsorsTableProps) {
  const router = useRouter();
  const isGroupsTab = activeTab === 'groups';
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-100">
            {isGroupsTab ? (
              <>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  GROUP NAME
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  TYPE
                </th>
              </>
            ) : (
              <>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  LAST NAME
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  FIRST NAME
                </th>
              </>
            )}
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              ID
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              LOCATION
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              STATUS
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              CHILDREN
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {isGroupsTab
            ? GROUPS_DATA.map((group) => (
                <tr
                  key={group.id}
                  className="border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-900">
                    {group.groupName}
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {group.type}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {group.groupId}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {group.location}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        group.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {group.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {group.childrenCount}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push(`/admin/sponsors/${group.groupId}`)}
                        className="text-primary hover:underline font-medium cursor-pointer transition-all"
                      >
                        View
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => onEdit?.(group)}
                        className="text-primary hover:underline font-medium cursor-pointer transition-all"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            : SPONSORS_DATA.map((sponsor) => (
                <tr
                  key={sponsor.id}
                  className="border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-900">
                    {sponsor.lastName}
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {sponsor.firstName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {sponsor.sponsorId}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {sponsor.location}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        sponsor.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {sponsor.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {sponsor.childrenCount}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push(`/admin/sponsors/${sponsor.sponsorId}`)}
                        className="text-primary hover:underline font-medium cursor-pointer transition-all"
                      >
                        View
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => onEdit?.(sponsor)}
                        className="text-primary hover:underline font-medium cursor-pointer transition-all"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
