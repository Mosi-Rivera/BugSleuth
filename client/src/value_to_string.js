export const status = [
    'Open',
    'Not Started',
    'In Progress',
    'On Hold',
    'Blocked',
    'Testing',
    'Closed'
];

export const severity = [
    'High',
    'Medium',
    'Low'
];

export const role = [
    'owner',
    'admin',
    'developer',
    'client'
];

export const status_str = n => status[n];

export const severity_str = n => severity[n];

export const role_str = n => role[n];