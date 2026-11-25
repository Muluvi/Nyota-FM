import React from 'react';
import { InteractiveStudioPlan } from '../components/website/InteractiveStudioPlan';
import { VisualRadioStudioSimulator } from '../components/website/VisualRadioStudioSimulator';
import { PowerResilienceMatrix } from '../components/website/PowerResilienceMatrix';
import { OBVanExplorer } from '../components/website/OBVanExplorer';
import { EquipmentLifecycleLog } from '../components/website/EquipmentLifecycleLog';
import { EditorialPolicyHandbook } from '../components/website/EditorialPolicyHandbook';
import { BrandIdentityViewer } from '../components/website/BrandIdentityViewer';

export default function OperationsTools() {
  return (
    <div className="space-y-8">
      <InteractiveStudioPlan />
      <VisualRadioStudioSimulator />
      <PowerResilienceMatrix />
      <OBVanExplorer />
      <EquipmentLifecycleLog />
      <EditorialPolicyHandbook />
      <BrandIdentityViewer />
    </div>
  );
}
