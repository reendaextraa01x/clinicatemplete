export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface AnalysisResult {
  norwoodScale?: string;
  estimatedGrafts?: string;
  recommendation: string;
  disclaimer: string;
}

export enum TreatmentType {
  FUE = 'FUE Premium',
  DHI = 'DHI Precision',
  PRP = 'PRP Therapy'
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}
