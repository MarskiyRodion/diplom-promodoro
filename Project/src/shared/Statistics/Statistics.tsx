import React from 'react';
import { ActivitiPanel } from './ActivitiPanel';
import { FocusPauseStop } from './FocusPauseStop';
import { WeekDayPomidor } from './WeekDayPomidor';

export function Statistics() {
  return (
    <div>
      <ActivitiPanel />
      <WeekDayPomidor />
      <FocusPauseStop />
    </div>
  );
}
