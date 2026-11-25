import React from 'react';
import { InteractiveSchedule } from '../components/website/InteractiveSchedule';
import { TwangaaLexicon } from '../components/website/TwangaaLexicon';
import { PresenterRoster } from '../components/website/PresenterRoster';
import { EmergencyAlertConsole } from '../components/website/EmergencyAlertConsole';
import { TwangaaMobileSimulator } from '../components/website/TwangaaMobileSimulator';
import { DiasporaHub } from '../components/website/DiasporaHub';
import { LoyaltyClubEngine } from '../components/website/LoyaltyClubEngine';
import { PodcastArchivePlayer } from '../components/website/PodcastArchivePlayer';

export default function ListenerTools() {
  return (
    <div className="space-y-8">
      <InteractiveSchedule />
      <TwangaaLexicon />
      <PresenterRoster />
      <EmergencyAlertConsole />
      <TwangaaMobileSimulator />
      <DiasporaHub />
      <LoyaltyClubEngine />
      <PodcastArchivePlayer />
    </div>
  );
}
