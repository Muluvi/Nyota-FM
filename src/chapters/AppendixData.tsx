import React from 'react';
import { DataEnrichedAnnexure } from '../components/v2/DataEnrichedAnnexure';
import { SourceListAndAsks } from '../components/v2/SourceListAndAsks';

export default function AppendixData() {
  return (
    <>
      <DataEnrichedAnnexure />
      <SourceListAndAsks show="sources" />
    </>
  );
}
