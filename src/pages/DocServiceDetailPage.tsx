import React from 'react';
import { ServiceDetailPage } from './ServiceDetailPage';

interface DocServiceDetailPageProps {
  onOpenConsultation: (preselectedService?: string) => void;
}

export const DocServiceDetailPage: React.FC<DocServiceDetailPageProps> = ({ onOpenConsultation }) => {
  return <ServiceDetailPage onOpenConsultation={onOpenConsultation} />;
};
